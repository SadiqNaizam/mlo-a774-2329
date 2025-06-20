import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { type LucideProps } from 'lucide-react'; // Using 'type' for type-only import
import { cn } from '@/lib/utils'; // Assuming cn is available

interface CategoryPillProps {
  /** The display name of the category */
  categoryName: string;
  /** A URL-friendly slug for the category, used in navigation */
  categorySlug: string;
  /** Optional icon component (e.g., from lucide-react) */
  IconComponent?: React.ComponentType<LucideProps & React.SVGProps<SVGSVGElement>>;
  /** Optional image URL for the category. If provided, this will be displayed instead of the icon. */
  imageUrl?: string;
  /** Optional additional CSS classes for custom styling */
  className?: string;
  /** Optional click handler if behavior beyond navigation is needed */
  onClick?: (categorySlug: string) => void;
}

const CategoryPill: React.FC<CategoryPillProps> = ({
  categoryName,
  categorySlug,
  IconComponent,
  imageUrl,
  className,
  onClick,
}) => {
  console.log(`CategoryPill loaded for: ${categoryName}`);

  const path = `/product-listing?category=${encodeURIComponent(categorySlug)}`;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      // If a custom onClick is provided, it might want to prevent default navigation
      // For now, we assume it's for additional logic alongside navigation.
      onClick(categorySlug);
    }
    // Navigation will proceed via the Link component
  };

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className={cn("rounded-full shadow-sm hover:shadow-md transition-shadow", className)}
    >
      <Link to={path} onClick={handleClick} className="flex items-center gap-1.5 px-3"> {/* Adjusted padding for content */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${categoryName} category`}
            className="h-5 w-5 rounded-full object-cover flex-shrink-0"
          />
        ) : IconComponent ? (
          <IconComponent className="h-4 w-4 flex-shrink-0" />
        ) : null}
        <span className="truncate">{categoryName}</span>
      </Link>
    </Button>
  );
};

export default CategoryPill;