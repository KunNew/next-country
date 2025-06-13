import { Skeleton } from "../ui/skeleton";

export function CountryDetailSkeleton() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="w-full aspect-[3/2] rounded-lg mb-6" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-5 w-1/2 mb-6" />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border border-border/65 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-3 space-y-8">
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-border/40 gap-2">
                  <Skeleton className="w-24 h-4 mb-1 sm:mb-0" />
                  <Skeleton className="flex-1 h-4 max-w-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  