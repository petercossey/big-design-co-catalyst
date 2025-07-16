import Image from 'next/image';

interface Props {
  category: string;
  title: string;
  image?: string;
}

export function ProductShowcase({
  category,
  title,
  image = '/placeholder.svg?height=300&width=400',
}: Props) {
  return (
    <div
      className="group h-full w-full cursor-pointer overflow-hidden border-4 bg-white shadow-md"
      style={{
        borderColor: 'rgb(231, 41, 77)',
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image || '/placeholder.svg'}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 text-white" style={{ backgroundColor: 'rgb(231, 41, 77)' }}>
        <h3 className="mb-2 text-lg font-bold tracking-wide">{category}</h3>
        <div className="space-y-1">
          <p className="text-base font-medium">{title}</p>
        </div>
      </div>
    </div>
  );
}
