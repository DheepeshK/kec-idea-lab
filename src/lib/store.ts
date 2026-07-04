import fs from 'fs';
import path from 'path';

// Static imports so Vercel bundles the seed data
import teamSeed from '../../data/team.json';
import equipmentSeed from '../../data/equipment.json';
import eventsSeed from '../../data/events.json';
import registrationsSeed from '../../data/registrations.json';
import contactSeed from '../../data/contact.json';
import calendarSeed from '../../data/calendar.json';

const SEED: Record<string, any[]> = {
  team: teamSeed as any[],
  equipment: equipmentSeed as any[],
  events: eventsSeed as any[],
  registrations: registrationsSeed as any[],
  contact: contactSeed as any[],
  calendar: calendarSeed as any[],
};

const isVercel = !!process.env.VERCEL;
const DATA_DIR = isVercel ? '/tmp/data' : path.join(process.cwd(), 'data');

let seeded = false;

function ensureDir() {
  if (seeded) return;
  seeded = true;
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  for (const [name, data] of Object.entries(SEED)) {
    const fp = path.join(DATA_DIR, `${name}.json`);
    if (!fs.existsSync(fp)) {
      fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf-8');
    }
  }
}

function filePath(collection: string): string {
  return path.join(DATA_DIR, `${collection}.json`);
}

function readFile<T>(collection: string): T[] {
  const fp = filePath(collection);
  if (!fs.existsSync(fp)) {
    if (SEED[collection]) return [...SEED[collection]] as T[];
    return [];
  }
  const raw = fs.readFileSync(fp, 'utf-8');
  try {
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeFile<T>(collection: string, data: T[]): void {
  ensureDir();
  fs.writeFileSync(filePath(collection), JSON.stringify(data, null, 2), 'utf-8');
}

let idCounter = Date.now();

export function genId(): string {
  return (++idCounter).toString(36);
}

export function getAll<T = any>(collection: string, sort?: (a: T, b: T) => number): T[] {
  const items = readFile<T>(collection);
  if (sort) items.sort(sort);
  return items;
}

export function create<T = any>(collection: string, data: T): T {
  const items = readFile<T>(collection);
  const newItem = { ...data, _id: (data as any)._id || genId() };
  items.push(newItem);
  writeFile(collection, items);
  return newItem;
}

export function update<T = any>(collection: string, id: string, data: Partial<T>): T | null {
  const items = readFile<T>(collection);
  const idx = items.findIndex((item: any) => item._id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data, _id: id } as any;
  writeFile(collection, items);
  return items[idx];
}

export function remove(collection: string, id: string): boolean {
  const items = readFile(collection);
  const idx = items.findIndex((item: any) => item._id === id);
  if (idx === -1) return false;
  items.splice(idx, 1);
  writeFile(collection, items);
  return true;
}
