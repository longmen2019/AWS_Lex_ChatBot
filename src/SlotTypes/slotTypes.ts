import { SlotType } from "../Bot/types.js";

// Slot type for possible departure cities
const departureCityValues: SlotType = {
  slotTypeName: "DepartureCityValues",
  description: "Enumeration representing possible departure cities for flights",
  valueSelectionSetting: {
    resolutionStrategy: "OriginalValue",
  },
  slotTypeValues: [
    { sampleValue: { value: "New York" } },
    { sampleValue: { value: "Los Angeles" } },
    { sampleValue: { value: "Chicago" } },
    { sampleValue: { value: "Houston" } },
    { sampleValue: { value: "Miami" } },
    // Add more cities as needed
  ],
};

// Slot type for possible arrival cities
const arrivalCityValues: SlotType = {
  slotTypeName: "ArrivalCityValues",
  description: "Enumeration representing possible arrival cities for flights",
  valueSelectionSetting: {
    resolutionStrategy: "OriginalValue",
  },
  slotTypeValues: [
    { sampleValue: { value: "San Francisco" } },
    { sampleValue: { value: "Seattle" } },
    { sampleValue: { value: "Las Vegas" } },
    { sampleValue: { value: "Denver" } },
    { sampleValue: { value: "Boston" } },
    // Add more cities as needed
  ],
};

// Slot type for possible counts of passengers
const passengerCountValues: SlotType = {
  slotTypeName: "PassengerCountValues",
  description: "Enumeration representing possible counts of passengers",
  valueSelectionSetting: {
    resolutionStrategy: "OriginalValue",
  },
  slotTypeValues: [
    { sampleValue: { value: "1" } },
    { sampleValue: { value: "2" } },
    { sampleValue: { value: "3" } },
    { sampleValue: { value: "4" } },
    { sampleValue: { value: "5 or more" } },
    // Add more options if needed
  ],
};

// Slot type for possible types of a hotel room
const roomTypeValues: SlotType = {
  slotTypeName: "RoomTypeValues",
  description: "Enumeration representing possible types of a hotel room",
  valueSelectionSetting: {
    resolutionStrategy: "OriginalValue",
  },
  slotTypeValues: [
    { sampleValue: { value: "king" } },
    { sampleValue: { value: "queen" } },
    { sampleValue: { value: "deluxe" } },
  ],
};

// Slot type for possible types of cars available for rental
const carTypeValues: SlotType = {
  slotTypeName: "CarTypeValues",
  description: "Enumeration representing possible types of cars available for rental",
  valueSelectionSetting: {
    resolutionStrategy: "OriginalValue",
  },
  slotTypeValues: [
    { sampleValue: { value: "economy" } },
    { sampleValue: { value: "standard" } },
    { sampleValue: { value: "midsize" } },
    { sampleValue: { value: "full size" } },
  ],
};

// Export all slot types
export default [
  departureCityValues,
  arrivalCityValues,
  passengerCountValues,
  roomTypeValues,
  carTypeValues,
] as SlotType[];
