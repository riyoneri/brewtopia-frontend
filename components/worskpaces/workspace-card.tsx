import Image from "next/image";

export default function WorkspaceCard({ imageUrl, name }: WorkspaceDto) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 grid w-4/5 bg-white p-1 xs:w-2/5 xs:p-2">
        <span className="font-medium">{name}</span>
        <span className="text-xs text-primary xs:text-sm">Workspace</span>
      </div>
      <Image
        src={imageUrl}
        className="max-h-72 w-full object-cover"
        height={800}
        width={500}
        alt={`${name} image`}
      />
    </div>
  );
}
