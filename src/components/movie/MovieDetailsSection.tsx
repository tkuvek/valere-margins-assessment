import Image from 'next/image';
import { InfoCard } from '@/components/ui/InfoCard';
import { InfoRow } from '@/components/ui/InfoRow';
import { DetailGrid } from '@/components/ui/DetailGrid';
import { getLogoUrl } from '@/utils/imageUtils';
import { formatCurrency } from '@/utils/formatters';

interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  iso_639_1: string;
  english_name: string;
}

interface MovieDetailsSectionProps {
  budget: number;
  revenue: number;
  status: string;
  originalLanguage: string;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  spokenLanguages: SpokenLanguage[];
  voteCount: number;
  popularity: number;
  className?: string;
}

export function MovieDetailsSection({
  budget,
  revenue,
  status,
  originalLanguage,
  productionCompanies,
  productionCountries,
  spokenLanguages,
  voteCount,
  popularity,
  className = ''
}: MovieDetailsSectionProps) {
  return (
    <div className={`container mx-auto px-6 py-4 ${className}`}>
      <DetailGrid columns={3} gap="lg">
        {/* Production Info */}
        <InfoCard title="Production">
          <InfoRow label="Budget" value={formatCurrency(budget)} />
          <InfoRow label="Revenue" value={formatCurrency(revenue)} />
          <InfoRow label="Status" value={status} />
          <InfoRow label="Original Language" value={originalLanguage.toUpperCase()} />
        </InfoCard>

        {/* Production Companies */}
        {productionCompanies.length > 0 && (
          <InfoCard title="Production Companies">
            {productionCompanies.slice(0, 5).map((company) => (
              <div key={company.id} className="flex items-center gap-3">
                {company.logo_path && (
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src={getLogoUrl(company.logo_path, 'small')}
                      alt={company.name}
                      width={92}
                      height={92}
                      className="w-8 h-8 object-contain"
                      sizes="32px"
                    />
                  </div>
                )}
                <span className="text-gray-300">{company.name}</span>
              </div>
            ))}
          </InfoCard>
        )}

        {/* Countries & Languages */}
        <InfoCard title="Details">
          <div>
            <span className="text-gray-400">Countries:</span>
            <div className="mt-1">
              {productionCountries.map((country, index) => (
                <span key={country.iso_3166_1}>
                  {country.name}
                  {index < productionCountries.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-gray-400">Languages:</span>
            <div className="mt-1">
              {spokenLanguages.map((language, index) => (
                <span key={language.iso_639_1}>
                  {language.english_name}
                  {index < spokenLanguages.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
          <InfoRow label="Vote Count" value={voteCount.toLocaleString()} />
          <InfoRow label="Popularity" value={popularity.toFixed(1)} />
        </InfoCard>
      </DetailGrid>
    </div>
  );
} 