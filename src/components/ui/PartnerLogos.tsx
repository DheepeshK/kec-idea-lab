'use client';

const logos = [
  { src: '/AICTE.png', alt: 'AICTE' },
  { src: '/KEC_new2.png', alt: 'KEC' },
  { src: '/IDEALab.png', alt: 'IDEA Lab' },
  { src: '/IIC.png', alt: 'IIC' },
  { src: '/EMDC.png', alt: 'EMDC' },
  { src: '/TBI.png', alt: 'TBI' },
];

interface PartnerLogosProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-10 w-auto',
  md: 'h-14 w-auto',
  lg: 'h-20 w-auto',
};

export default function PartnerLogos({ size = 'md', className = '' }: PartnerLogosProps) {
  return (
    <div className={`flex items-center justify-center gap-4 md:gap-6 flex-wrap ${className}`}>
      {logos.map((logo) => (
        <div key={logo.alt} className={`relative ${sizeClasses[size]} opacity-70 hover:opacity-100 transition-opacity`}>
          <img
            src={logo.src}
            alt={logo.alt}
            className="h-full w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
}
