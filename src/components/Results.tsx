import proof1 from "@/assets/proof-1.png";
import proof2 from "@/assets/proof-2.png";
import proof3 from "@/assets/proof-3.png";
import proof4 from "@/assets/proof-4.png";
import results from "@/assets/results.png";
import deletions from "@/assets/deletions.png";

const images = [proof1, proof2, proof3, proof4, results, deletions];

const Results = () => (
  <section className="bg-secondary py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
          Real Clients. <span className="text-primary">Real Results.</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          See real improvements from real clients. Negative items removed, scores improved, funding unlocked.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-transform hover:scale-[1.02]">
            <img src={src} alt={`Client result ${i + 1}`} className="h-auto w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Results;
