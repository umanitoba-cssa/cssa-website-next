export const ExecProfiles = [
  {
    name: "Tofunmi Layi-Babatunde",
    position: "Director of Advocacy",
    image: "/img/team/prevExecs/tofunmi.png",
    year: 2022,
  },
  {
    name: "Edwin Duong",
    position: "Director of Internal Affairs",
    image: "/img/team/vacant.png",
    year: 2023,
  },
  {
    name: "Travis Friesen",
    position: "Director of Promotions",
    image: "/img/team/execs/travis.JPG",
    year: 2024,
  },
  {
    name: "Chinu Chandaria",
    position: "Director of Events",
    image: "/img/team/prevExecs/chinu.png",
    year: 2022,
  },
  {
    name: "Ginelle Temull",
    position: "Director of Finance",
    image: "/img/team/prevExecs/ginelle.png",
    year: 2025,
  },
  {
    name: "KC del Moro",
    position: "Assistant Director of Promotions",
    image: "/img/team/execs/kc.JPG",
    year: 2021,
  },
  {
    name: "Okiki Fasanmi",
    position: "Vice President",
    image: "/img/team/prevExecs/okiki.png",
    year: 2020,
  },
];

export const filterByYear = (year: string) => {
  return ExecProfiles.filter((exec) => exec.year === parseInt(year));
};
