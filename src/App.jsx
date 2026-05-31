import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBreeds, fetchBreedDetails, fetchFacts, fetchGroups } from "./api";

function App() {
  const [selectedBreedId, setSelectedBreedId] = useState(null);

  const breedsQuery = useQuery({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
  });

  const breedDetailsQuery = useQuery({
    queryKey: ["breedDetails", selectedBreedId],
    queryFn: () => fetchBreedDetails(selectedBreedId),
    enabled: !!selectedBreedId,
  });

  const factsQuery = useQuery({
    queryKey: ["facts"],
    queryFn: fetchFacts,
  });

  const groupsQuery = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  return (
    <main className="container">
      <h1>Dog Query App</h1>
      <p className="subtitle">
        This app uses TanStack Query to fetch dog breeds, details, facts, and groups.
      </p>

      <section className="card">
        <h2>Dog Breeds</h2>

        {breedsQuery.isPending && <p className="loading">Loading breeds...</p>}
        {breedsQuery.isError && <p className="error">Error: {breedsQuery.error.message}</p>}
        {breedsQuery.isSuccess && (
          <div className="breed-grid">
            {breedsQuery.data.data.map((breed) => (
              <button
                key={breed.id}
                className="breed-button"
                onClick={() => setSelectedBreedId(breed.id)}
              >
                {breed.attributes.name}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <h2>Breed Details</h2>

        {!selectedBreedId && <p>Click a breed above to see details.</p>}

        {breedDetailsQuery.isPending && selectedBreedId && <p className="loading">Loading breed details...</p>}
        {breedDetailsQuery.isError && <p className="error">Error: {breedDetailsQuery.error.message}</p>}
        {breedDetailsQuery.isSuccess && (
          <div>
            <h3>{breedDetailsQuery.data.data.attributes.name}</h3>
            <p>{breedDetailsQuery.data.data.attributes.description}</p>

            <p>
              <strong>Life span:</strong>{" "}
              {breedDetailsQuery.data.data.attributes.life?.min} -{" "}
              {breedDetailsQuery.data.data.attributes.life?.max} years
            </p>

            <p>
              <strong>Male weight:</strong>{" "}
              {breedDetailsQuery.data.data.attributes.male_weight?.min} -{" "}
              {breedDetailsQuery.data.data.attributes.male_weight?.max} kg
            </p>

            <p>
              <strong>Female weight:</strong>{" "}
              {breedDetailsQuery.data.data.attributes.female_weight?.min} -{" "}
              {breedDetailsQuery.data.data.attributes.female_weight?.max} kg
            </p>
          </div>
        )}
      </section>

      <section className="card">
        <h2>Dog Facts</h2>

        {factsQuery.isPending && <p className="loading">Loading facts...</p>}
        {factsQuery.isError && <p className="error">Error: {factsQuery.error.message}</p>}
        {factsQuery.isSuccess && (
          <ul>
            {factsQuery.data.data.map((fact) => (
              <li key={fact.id}>{fact.attributes.body}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2>Dog Groups</h2>

        {groupsQuery.isPending && <p className="loading">Loading groups...</p>}
        {groupsQuery.isError && <p className="error">Error: {groupsQuery.error.message}</p>}
        {groupsQuery.isSuccess && (
          <div className="group-grid">
            {groupsQuery.data.data.map((group) => (
              <div key={group.id} className="group-card">
                <h3>{group.attributes.name}</h3>
                <p>
                  Breeds in this group: {group.relationships.breeds.data.length}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
