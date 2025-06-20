import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, LocateFixed } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface LocationSelectorProps {
  initialLocation?: string;
  onLocationChange?: (location: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  initialLocation = "Select Location",
  onLocationChange,
}) => {
  const [currentLocation, setCurrentLocation] = useState<string>(initialLocation);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    console.log('LocationSelector loaded');
    // In a real app, you might try to auto-detect location here
    // or load a saved location from localStorage/API.
  }, []);

  const handleOpenDialog = () => {
    setSearchInput(""); // Clear search input when opening dialog
    setDialogOpen(true);
  };

  const handleConfirmLocation = () => {
    if (searchInput.trim() === "") {
      toast({
        title: "Invalid Location",
        description: "Please enter a location.",
        variant: "destructive",
      });
      return;
    }
    setCurrentLocation(searchInput);
    if (onLocationChange) {
      onLocationChange(searchInput);
    }
    toast({
      title: "Location Updated",
      description: `Delivery location set to ${searchInput}.`,
    });
    setDialogOpen(false);
  };

  const handleUseCurrentGPSLocation = () => {
    // Placeholder for actual GPS functionality
    const mockGpsLocation = "123 GPS Street, GeoCity";
    setCurrentLocation(mockGpsLocation);
    setSearchInput(mockGpsLocation); // Pre-fill search input
    if (onLocationChange) {
      onLocationChange(mockGpsLocation);
    }
    toast({
      title: "Location Updated",
      description: `Delivery location set to (mocked) ${mockGpsLocation}.`,
    });
    setDialogOpen(false); // Close dialog after "using current location"
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 text-sm px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            onClick={handleOpenDialog}
          >
            <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="truncate max-w-[150px] md:max-w-[200px] text-gray-700 dark:text-gray-300">
              {currentLocation}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Delivery Location</DialogTitle>
            <DialogDescription>
              Enter your address or area to find products available for delivery.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="location-search" className="sr-only">
                Search for area, street name...
              </Label>
              <Input
                id="location-search"
                placeholder="Search for area, street name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="col-span-3"
              />
            </div>
            <Button variant="outline" onClick={handleUseCurrentGPSLocation} className="w-full">
              <LocateFixed className="mr-2 h-4 w-4" />
              Use My Current Location
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleConfirmLocation}>Set Location</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationSelector;