import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { type LucideProps } from 'lucide-react'; // Using 'type' for type-only import

interface CategoryPillProps {
  /** The display name of the category */
  categoryName: string;
  /** A URL-friendly slug for the category, used in navigation */
  categorySlug: string;
  /** Optional icon component (e.g., from lucide-react) */
  IconComponent?: React.ComponentType<LucideProps & React.SVGProps<SVGSVGElement>>;
  /** Optional additional CSS classes for custom styling */
  className?: string;
  /** Optional click handler if behavior beyond navigation is needed */
  onClick?: (categorySlug: string) => void;
}

const CategoryPill: React.FC<CategoryPillProps> = ({
  categoryName,
  categorySlug,
  IconComponent,
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
      className={`rounded-full shadow-sm hover:shadow-md transition-shadow ${className}`}
      // onClick prop on Button itself is not directly used when asChild is active for Link's navigation.
      // If specific button click logic separate from navigation is needed, it's more complex.
      // For now, Link handles the navigation.
    >
      <Link to={path} onClick={handleClick}>
        {IconComponent && <IconComponent className="mr-1.5 h-4 w-4" />}
        {categoryName}
      </Link>
    </Button>
  );
};

export default CategoryPill;