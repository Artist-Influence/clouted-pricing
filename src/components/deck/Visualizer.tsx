interface VisualizerProps {
  type: string;
}

const Visualizer = ({ type }: VisualizerProps) => {
  switch (type) {
    case "signal":
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-primary/20"
              style={{
                width: `${(i + 1) * 180}px`,
                height: `${(i + 1) * 180}px`,
                animation: `pulse-ring 4s ease-out ${i * 0.6}s infinite`,
              }}
            />
          ))}
        </div>
      );

    case "growth":
      return (
        <div className="absolute bottom-0 right-0 w-1/3 h-2/3 flex items-end gap-1.5 p-12 pointer-events-none z-0 opacity-[0.12]">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-primary rounded-t origin-bottom"
              style={{
                height: `${15 + (i * i * 0.5)}%`,
                animation: `grow-bar 1.2s ease-out ${i * 0.08}s both`,
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>
      );

    case "network":
      return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const x = 15 + Math.random() * 70;
            const y = 15 + Math.random() * 70;
            const size = 4 + Math.random() * 8;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-primary/15"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animation: `expand-node 2s ease-out ${i * 0.15}s both`,
                }}
              />
            );
          })}
          {[...Array(12)].map((_, i) => {
            const x1 = 20 + Math.random() * 60;
            const y1 = 20 + Math.random() * 60;
            const angle = Math.random() * 360;
            const length = 60 + Math.random() * 120;
            return (
              <div
                key={`line-${i}`}
                className="absolute bg-primary/[0.06] origin-left"
                style={{
                  left: `${x1}%`,
                  top: `${y1}%`,
                  width: `${length}px`,
                  height: "1px",
                  transform: `rotate(${angle}deg)`,
                  animation: `expand-node 2.5s ease-out ${i * 0.2}s both`,
                }}
              />
            );
          })}
        </div>
      );

    case "tiles":
      return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(18)].map((_, i) => {
            const x = 10 + Math.random() * 80;
            const w = 30 + Math.random() * 50;
            const h = 20 + Math.random() * 35;
            const delay = i * 0.3;
            const duration = 8 + Math.random() * 6;
            return (
              <div
                key={i}
                className="absolute rounded-lg bg-primary/[0.06] border border-primary/[0.08]"
                style={{
                  left: `${x}%`,
                  bottom: `-${h}px`,
                  width: `${w}px`,
                  height: `${h}px`,
                  animation: `float-up ${duration}s linear ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>
      );

    case "chart":
      return (
        <div className="absolute bottom-0 right-8 w-1/4 h-3/5 flex items-end gap-2 pointer-events-none z-0 opacity-[0.1]">
          {[4, 6, 5, 8, 7, 10, 9, 12].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-primary rounded-t origin-bottom"
              style={{
                height: `${h * 8}%`,
                animation: `grow-bar 1s ease-out ${i * 0.1}s both`,
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>
      );

    case "funnel":
      return (
        <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.1]">
          {[...Array(5)].map((_, i) => {
            const width = 300 - i * 50;
            return (
              <div
                key={i}
                className="mx-auto mb-2 bg-primary rounded"
                style={{
                  width: `${width}px`,
                  height: "24px",
                  animation: `expand-node 1.5s ease-out ${i * 0.2}s both`,
                }}
              />
            );
          })}
        </div>
      );

    default:
      return null;
  }
};

export default Visualizer;
