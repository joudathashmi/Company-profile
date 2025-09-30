import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building } from "lucide-react";

export default function GlobalPresenceContent({ company }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [mapCenter, setMapCenter] = useState([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);
  const [showOffices, setShowOffices] = useState([]);

  if (!company) return null;

  // Provide default geographic data with valid coordinates and offices
  const defaultGeographicData = [
    {
      region: "North America",
      revenue_percentage: 51,
      office_count: 125,
      lat: 40.7128,
      lng: -95.0060,
      offices: [
        { city: "New York", country: "USA", lat: 40.7128, lng: -74.0060, employee_count: 8500, office_type: "Regional Office" },
        { city: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832, employee_count: 2800, office_type: "Sales Office" }
      ]
    },
    {
      region: "Europe",
      revenue_percentage: 29,
      office_count: 89,
      lat: 54.5260,
      lng: 15.2551,
      offices: [
        { city: "Dublin", country: "Ireland", lat: 53.3498, lng: -6.2603, employee_count: 3200, office_type: "Regional Office" },
        { city: "London", country: "UK", lat: 51.5074, lng: -0.1278, employee_count: 4100, office_type: "Sales Office" }
      ]
    }
  ];

  // Use company data if available, otherwise use defaults
  let geographicPresence = company.geographic_presence || defaultGeographicData;
  
  // Ensure all regions have valid coordinates
  geographicPresence = geographicPresence.map(region => ({
    ...region,
    lat: region.lat || getDefaultCoordinates(region.region).lat,
    lng: region.lng || getDefaultCoordinates(region.region).lng,
    offices: region.offices || []
  })).filter(region => 
    region.lat !== undefined && 
    region.lng !== undefined && 
    !isNaN(region.lat) && 
    !isNaN(region.lng)
  );

  function getDefaultCoordinates(regionName) {
    const coordinates = {
      "North America": { lat: 40.7128, lng: -95.0060 },
      "Americas": { lat: 40.7128, lng: -95.0060 },
      "Europe": { lat: 54.5260, lng: 15.2551 },
      "Asia Pacific": { lat: 35.6762, lng: 139.6503 },
      "China": { lat: 31.2304, lng: 121.4737 },
      "United States": { lat: 39.8283, lng: -98.5795 }
    };
    return coordinates[regionName] || { lat: 0, lng: 0 };
  }

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setMapCenter([region.lat, region.lng]);
    setMapZoom(region.region === "Europe" ? 4 : 5);
    setShowOffices(region.offices || []);
  };

  const resetMapView = () => {
    setSelectedRegion(null);
    setMapCenter([20, 0]);
    setMapZoom(2);
    setShowOffices([]);
  };

  const getOfficeTypeColor = (type) => {
    switch (type) {
      case "Headquarters": return "bg-red-100 text-red-800";
      case "Regional Office": return "bg-blue-100 text-blue-800";
      case "R&D Center": return "bg-purple-100 text-purple-800";
      case "Sales Office": return "bg-green-100 text-green-800";
      case "Manufacturing": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Global Presence of {company.company_name}</h1>
        <p className="text-slate-600">Mapping the worldwide operations and revenue centers. Click on any region to explore offices.</p>
        {selectedRegion && (
          <div className="mt-4 flex items-center justify-between">
            <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
              Viewing: {selectedRegion.region} ({selectedRegion.offices?.length || 0} offices)
            </Badge>
            <button
              onClick={resetMapView}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              View All Regions
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0 bg-white h-[600px]">
            <CardContent className="p-0 h-full">
              <MapContainer 
                center={mapCenter} 
                zoom={mapZoom} 
                scrollWheelZoom={false} 
                style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
                key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                
                {/* Show regional markers when zoomed out */}
                {!selectedRegion && geographicPresence.map((region, index) => {
                  if (region.lat && region.lng && !isNaN(region.lat) && !isNaN(region.lng)) {
                    return (
                      <Marker key={index} position={[region.lat, region.lng]}>
                        <Popup>
                          <div className="font-bold">{region.region}</div>
                          <div>Revenue: {region.revenue_percentage}%</div>
                          <div>Offices: {region.office_count}</div>
                        </Popup>
                      </Marker>
                    );
                  }
                  return null;
                })}

                {/* Show office markers when region is selected */}
                {selectedRegion && showOffices.map((office, index) => (
                  <Marker key={`office-${index}`} position={[office.lat, office.lng]}>
                    <Popup>
                      <div className="space-y-1">
                        <div className="font-bold">{office.city}, {office.country}</div>
                        <div className="text-sm text-gray-600">{office.office_type}</div>
                        <div className="text-sm">{office.employee_count?.toLocaleString()} employees</div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {geographicPresence.map((region, index) => (
            <Card 
              key={index} 
              className={`shadow-lg border-0 bg-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedRegion?.region === region.region ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => handleRegionClick(region)}
            >
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  <span>{region.region}</span>
                  <span className="text-lg font-bold text-blue-600">{region.revenue_percentage}%</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{region.office_count} Offices</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    <span>{region.offices?.length || 0} Locations</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600">
                    Click to explore offices
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}