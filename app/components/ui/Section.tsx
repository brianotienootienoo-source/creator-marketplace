type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: Props) {
  return (
    <section className="mt-8 px-6">
      {title && (
        <h2 className="text-lg font-semibold mb-3">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}