export interface PantoneColor {
  year: number;
  name: string;
  hex: string;
}

export const pantoneColors: PantoneColor[] = [
  { year: 2023, name: "Viva Magenta", hex: "#BB2649" },
  { year: 2022, name: "Very Peri", hex: "#6667AB" },
  { year: 2021, name: "Ultimate Gray", hex: "#939597" },
  { year: 2021, name: "Illuminating", hex: "#F5DF4D" }, // 2021 had two colors
  { year: 2020, name: "Classic Blue", hex: "#0F4C81" },
  { year: 2019, name: "Living Coral", hex: "#FF6F61" },
  { year: 2018, name: "Ultra Violet", hex: "#5F4B8B" },
  { year: 2017, name: "Greenery", hex: "#88B04B" },
  { year: 2016, name: "Rose Quartz", hex: "#F7CAC9" },
  { year: 2016, name: "Serenity", hex: "#92A8D1" }, // 2016 had two colors
  { year: 2015, name: "Marsala", hex: "#955251" },
  { year: 2014, name: "Radiant Orchid", hex: "#B163A3" },
  { year: 2013, name: "Emerald", hex: "#009473" },
  { year: 2012, name: "Tangerine Tango", hex: "#DD4124" },
  { year: 2011, name: "Honeysuckle", hex: "#D94F70" },
  { year: 2010, name: "Turquoise", hex: "#45B5AA" },
];
