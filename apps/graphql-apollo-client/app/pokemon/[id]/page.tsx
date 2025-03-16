import PokemonDetail from "@/app/components/pokemon-detail";
import React from "react";
interface PokemonDetailPageProps {
  params: {
    id: string;
  };
}
const PokemonDetailPage = ({ params }: PokemonDetailPageProps) => {
  return (
    <div>
      <PokemonDetail id={params.id} />
    </div>
  );
};

export default PokemonDetailPage;
