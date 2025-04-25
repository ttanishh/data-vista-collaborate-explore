
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const contributors = [
  { name: "MISBAH", role: "Data Science Team", initials: "M" },
  { name: "AAYUDH", role: "Data Science Team", initials: "A" },
  { name: "NEEM", role: "Data Science Team", initials: "N" },
  { name: "TANISH", role: "Data Science Team", initials: "T" },
  { name: "RAJ", role: "Data Science Team", initials: "R" }
];

export function ContributorsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-data-blue/5 via-data-purple/5 to-data-pink/5 -z-10" />
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-data-blue via-data-purple to-data-pink">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The brilliant minds behind DataMate
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {contributors.map((contributor) => (
            <Card key={contributor.name} className="group relative overflow-hidden border-0 bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-xl hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-data-blue/10 via-data-purple/10 to-data-pink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-6 relative space-y-4">
                <Avatar className="w-16 h-16 mx-auto bg-gradient-to-br from-data-blue to-data-purple">
                  <AvatarFallback className="text-lg font-semibold text-white">
                    {contributor.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center space-y-1.5">
                  <h3 className="font-semibold">{contributor.name}</h3>
                  <p className="text-sm text-muted-foreground">{contributor.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
