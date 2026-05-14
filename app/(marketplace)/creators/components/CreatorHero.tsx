export function CreatorHero({
  bannerSrc,
  avatarSrc,
  name,
}: {
  bannerSrc: string;
  avatarSrc: string;
  name: string;
}) {
  return (
    <div className="relative w-full h-[260px]">
      <img
        src={bannerSrc}
        alt="creator banner"
        className="w-full h-full object-cover rounded-2xl"
      />

      <div className="absolute -bottom-10 left-4 w-[92px] h-[92px] rounded-full overflow-hidden border-4 border-white shadow-lg">
        <img
          src={avatarSrc}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}