import { FloatingCard } from "./FloatingCard";

export const FloatingCards = () => {
  return (
    <div className="sm:block hidden">
      <FloatingCard
        title="Elden Ring"
        score={96}
        genre="ACTION RPG"
        top="10%"
        left="5%"
        rotate={-3}
        delay={0}
      />
      <FloatingCard
        title="Hollow Knight"
        score={87}
        genre="METROIDVANIA"
        top="54%"
        left="3%"
        rotate={2}
        delay={1.5}
      />
      <FloatingCard
        title="Hades II"
        score={93}
        genre="ROGUELITE"
        top="12%"
        right="4%"
        rotate={3}
        delay={0.8}
      />
      <FloatingCard
        title="Celeste"
        score={94}
        genre="PLATFORMER"
        top="62%"
        right="3%"
        rotate={-2}
        delay={2.2}
      />
    </div>
  );
};
