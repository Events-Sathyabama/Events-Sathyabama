from django.db import transaction
from django.contrib.auth import get_user_model
import sys
import random
import time
import django
import os
names = [

    "Atlante",
    "Auberta",
    "Aubine",
    "Aubree",
    "Aubrette",
    "Aubrey",
    "Aubrie",
    "Aubry",
    "Audi",
    "Audie",
    "Audra",
    "Audre",
    "Audrey",
    "Audrie",
    "Audry",
    "Audrye",
    "Audy",
    "Augusta",
    "Auguste",
    "Augustina",
    "Augustine",
    "Aundrea",
    "Aura",
    "Aurea",
    "Aurel",
    "Aurelea",
    "Aurelia",
    "Aurelie",
    "Auria",
    "Aurie",
    "Aurilia",
    "Aurlie",
    "Auroora",
    "Aurora",
    "Aurore",
    "Austin",
    "Austina",
    "Austine",
    "Ava",
    "Aveline",
    "Averil",
    "Averyl",
    "Avie",
    "Avis",
    "Aviva",
    "Avivah",
    "Avril",
    "Avrit",
    "Ayn",
    "Bab",
    "Babara",
    "Babb",
    "Babbette",
    "Babbie",
    "Babette",
    "Babita",
    "Babs",
    "Bambi",
    "Bambie",
    "Bamby",
    "Barb",
    "Barbabra",
    "Barbara",
    "Barbara-Anne",
    "Barbaraanne",
    "Barbe",
    "Barbee",
    "Barbette",
    "Barbey",
    "Barbi",
    "Barbie",
    "Barbra",
    "Barby",
    "Bari",
    "Barrie",
    "Barry",
    "Basia",
    "Bathsheba",
    "Batsheva",
    "Bea",
    "Beatrice",
    "Beatrisa",
    "Beatrix",
    "Beatriz",
    "Bebe",
    "Becca",
    "Becka",
    "Becki",
    "Beckie",
    "Becky",
    "Bee",
    "Beilul",
    "Beitris",
    "Bekki",
    "Bel",
    "Belia",
    "Belicia",
    "Belinda",
    "Belita",
    "Bell",
    "Bella",

    "Brynna",
    "Brynne",
    "Buffy",
    "Bunni",
    "Bunnie",
    "Bunny",
    "Cacilia",
    "Cacilie",
    "Cahra",
    "Cairistiona",
    "Caitlin",
    "Caitrin",
    "Cal",
    "Calida",
    "Calla",
    "Calley",
    "Calli",
    "Callida",
    "Callie",
    "Cally",
    "Calypso",
    "Cam",
    "Camala",
    "Camel",
    "Camella",
    "Camellia",
    "Cami",
    "Camila",
    "Camile",
    "Camilla",
    "Camille",
    "Cammi",
    "Cammie",
    "Cammy",
    "Candace",
    "Candi",
    "Candice",
    "Candida",
    "Candide",
    "Candie",
    "Candis",
    "Candra",
    "Candy",
    "Caprice",
    "Cara",
    "Caralie",
    "Caren",
    "Carena",
    "Caresa",
    "Caressa",
    "Caresse",
    "Carey",
    "Cari",
    "Caria",
    "Carie",
    "Caril",
    "Carilyn",
    "Carin",
    "Carina",
    "Carine",
    "Cariotta",
    "Carissa",
    "Carita",
    "Caritta",
    "Carla",
    "Carlee",
    "Carleen",
    "Carlen",
    "Carlene",
    "Carley",
    "Carlie",
    "Carlin",
    "Carlina",
    "Carline",
    "Carlita",
    "Carlota",
    "Carlotta",
    "Carly",
    "Carlye",
    "Carlyn",
    "Carlynn",
    "Carlynne",
    "Carma",
    "Carmel",
    "Carmela",
    "Carmelia",
    "Carmelina",
    "Carmelita",
    "Carmella",
    "Carmelle",
    "Carmen",
    "Carmencita",
    "Carmina",
    "Carmine",
    "Carmita",
    "Carmon",
    "Caro",
    "Carol",
    "Carol-Jean",
    "Carola",
    "Carolan",
    "Carolann",
    "Carole",
    "Carolee",
    "Carolin",
    "Carolina",
    "Caroline",
    "Caroljean",
    "Carolyn",
    "Carolyne",
    "Carolynn",
    "Caron",
    "Carree",
    "Carri",
    "Carrie",
    "Carrissa",
    "Carroll",
    "Carry",
    "Cary",
    "Caryl",
    "Caryn",
    "Casandra",
    "Casey",
    "Casi",
    "Casie",
    "Cass",
    "Cassandra",
    "Cassandre",
    "Cassandry",
    "Cassaundra",
    "Cassey",
    "Cassi",
    "Cassie",
    "Cassondra",
    "Cassy",
    "Catarina",
    "Cate",
    "Caterina",
    "Catha",
    "Catharina",
    "Catharine",
    "Cathe",
    "Cathee",
    "Catherin",
    "Catherina",
    "Catherine",
    "Cathi",
    "Cathie",
    "Cathleen",
    "Cathlene",
    "Cathrin",
    "Cathrine",
    "Cathryn",
    "Cathy",
    "Cathyleen",
    "Cati",
    "Catie",
    "Catina",
    "Catlaina",
    "Catlee",
    "Catlin",
    "Catrina",
    "Catriona",
    "Caty",
    "Caye",
    "Cayla",
    "Cecelia",
    "Cecil",
    "Cecile",
    "Ceciley",
    "Cecilia",
    "Cecilla",
    "Cecily",
    "Ceil",
    "Cele",
    "Celene",
    "Celesta",
    "Celeste",
    "Celestia",
    "Celestina",
    "Celestine",
    "Celestyn",
    "Celestyna",
    "Celia",
    "Celie",
    "Celina",
    "Celinda",
    "Celine",
    "Celinka",
    "Celisse",
    "Celka",
    "Celle",
    "Cesya",
    "Chad",
    "Chanda",
    "Chandal",
    "Chandra",
    "Channa",
    "Chantal",
    "Chantalle",
    "Charil",
    "Charin",
    "Charis",
    "Charissa",
    "Charisse",
    "Charita",
    "Charity",
    "Charla",
    "Charlean",
    "Charleen",
    "Charlena",
    "Charlene",
    "Charline",
    "Charlot",
    "Charlotta",
    "Charlotte",
    "Charmain",
    "Charmaine",
    "Charmane",
    "Charmian",
    "Charmine",
    "Charmion",
    "Charo",
    "Charyl",
    "Chastity",
    "Chelsae",
    "Chelsea",
    "Chelsey",
    "Chelsie",
    "Chelsy",
    "Cher",
    "Chere",
    "Cherey",
    "Cheri",
    "Cherianne",
    "Cherice",
    "Cherida",
    "Cherie",
    "Cherilyn",
    "Cherilynn",
    "Cherin",
    "Cherise",
    "Cherish",
    "Cherlyn",
    "Cherri",
    "Cherrita",
    "Cherry",
    "Chery",
    "Cherye",
    "Cheryl",
    "Cheslie",
    "Chiarra",
    "Chickie",
    "Chicky",
    "Chiquia",
    "Chiquita",
    "Chlo",
    "Chloe",
    "Chloette",
    "Chloris",
    "Chris",
    "Chrissie",
    "Chrissy",
    "Christa",
    "Christabel",
    "Christabella",
    "Christal",
    "Christalle",
    "Christan",
    "Christean",
    "Christel",
    "Christen",
    "Christi",
    "Christian",
    "Christiana",
    "Christiane",
    "Christie",
    "Christin",
    "Christina",
    "Christine",
    "Christy",
    "Christye",
    "Christyna",
    "Chrysa",
    "Chrysler",

    "Donica",
    "Donielle",
    "Donna",
    "Donnamarie",
    "Donni",
    "Donnie",
    "Donny",
    "Dora",
    "Doralia",
    "Doralin",
    "Doralyn",
    "Doralynn",
    "Doralynne",
    "Dore",
    "Doreen",
    "Dorelia",
    "Dorella",
    "Dorelle",
    "Dorena",
    "Dorene",
    "Doretta",
    "Dorette",
    "Dorey",
    "Dori",
    "Doria",
    "Dorian",
    "Dorice",
    "Dorie",
    "Dorine",
    "Doris",
    "Dorisa",
    "Dorise",
    "Dorita",
    "Doro",
    "Dorolice",
    "Dorolisa",
    "Dorotea",
    "Doroteya",
    "Dorothea",
    "Dorothee",
    "Dorothy",
    "Dorree",
    "Dorri",
    "Dorrie",
    "Dorris",
    "Dorry",
    "Dorthea",
    "Dorthy",
    "Dory",
    "Dosi",
    "Dot",
    "Doti",
    "Dotti",
    "Dottie",
    "Dotty",
    "Dre",
    "Dreddy",
    "Dredi",
    "Drona",
    "Dru",
    "Druci",
    "Drucie",
    "Drucill",
    "Drucy",
    "Drusi",
    "Drusie",
    "Drusilla",
    "Drusy",
    "Dulce",
    "Dulcea",
    "Dulci",
    "Dulcia",
    "Dulciana",
    "Dulcie",
    "Dulcine",
    "Dulcinea",
    "Dulcy",
    "Dulsea",
    "Dusty",
    "Dyan",
    "Dyana",
    "Dyane",
    "Dyann",
    "Dyanna",
    "Dyanne",

    "Eustacia",
    "Eva",
    "Evaleen",
    "Evangelia",
    "Evangelin",
    "Evangelina",
    "Evangeline",
    "Evania",
    "Evanne",
    "Eve",
    "Eveleen",
    "Evelina",
    "Eveline",
    "Evelyn",
    "Evey",
    "Evie",
    "Evita",
    "Evonne",
    "Evvie",
    "Evvy",
    "Evy",
    "Eyde",
    "Eydie",
    "Ezmeralda",
    "Fae",
    "Faina",
    "Faith",
    "Fallon",
    "Fan",
    "Fanchette",
    "Fanchon",
    "Fancie",
    "Fancy",
    "Fanechka",
    "Fania",
    "Fanni",
    "Fannie",
    "Fanny",
    "Fanya",
    "Fara",

    "Guinna",
    "Gunilla",
    "Gus",
    "Gusella",
    "Gussi",
    "Gussie",
    "Gussy",
    "Gusta",
    "Gusti",
    "Gustie",
    "Gusty",
    "Gwen",
    "Gwendolen",
    "Gwendolin",
    "Gwendolyn",
    "Gweneth",
    "Gwenette",
    "Gwenneth",
    "Gwenni",
    "Gwennie",
    "Gwenny",
    "Gwenora",
    "Gwenore",
    "Gwyn",
    "Gwyneth",
    "Gwynne",
    "Gypsy",
    "Hadria",
    "Hailee",
    "Haily",
    "Haleigh",
    "Halette",
    "Haley",
    "Hali",
    "Halie",
    "Halimeda",
    "Halley",
    "Halli",
    "Hallie",
    "Hally",
    "Hana",
    "Hanna",
    "Hannah",
    "Hanni",
    "Hannie",
    "Hannis",
    "Hanny",
    "Happy",
    "Harlene",
    "Harley",
    "Harli",
    "Harlie",
    "Harmonia",
    "Harmonie",
    "Harmony",
    "Harri",
    "Harrie",
    "Harriet",

    "Honor",
    "Honoria",
    "Hope",
    "Horatia",
    "Hortense",
    "Hortensia",
    "Hulda",
    "Hyacinth",
    "Hyacintha",
    "Hyacinthe",
    "Hyacinthia",
    "Hyacinthie",
    "Hynda",
    "Ianthe",
    "Ibbie",
    "Ibby",

    "Imojean",
    "Ina",
    "Indira",
    "Ines",
    "Inesita",
    "Inessa",
    "Inez",
    "Inga",
    "Ingaberg",
    "Ingaborg",
    "Inge",
    "Ingeberg",
    "Ingeborg",
    "Inger",
    "Ingrid",
    "Ingunna",
    "Inna",
    "Iolande",
    "Iolanthe",
    "Iona",
    "Iormina",
    "Ira",
    "Irena",
    "Irene",
    "Irina",
    "Iris",
    "Irita",
    "Irma",
    "Isa",
    "Isabel",
    "Isabelita",
    "Isabella",
    "Isabelle",
    "Isadora",
    "Isahella",
    "Iseabal",
    "Isidora",
    "Isis",
    "Isobel",
    "Issi",
    "Issie",
    "Issy",
    "Ivett",
    "Ivette",
    "Ivie",
    "Ivonne",
    "Ivory",
    "Ivy",
    "Izabel",
    "Jacenta",
    "Jacinda",
    "Jacinta",
    "Jacintha",
    "Jacinthe",
    "Jackelyn",

    "Jobye",
    "Jobyna",
    "Jocelin",
    "Joceline",
    "Jocelyn",
    "Jocelyne",
    "Jodee",
    "Jodi",
    "Jodie",
    "Jody",
    "Joeann",
    "Joela",
    "Joelie",
    "Joell",
    "Joella",
    "Joelle",
    "Joellen",
    "Joelly",
    "Joellyn",
    "Joelynn",
    "Joete",
    "Joey",
    "Johanna",
    "Johannah",
    "Johna",
    "Johnath",
    "Johnette",
    "Johnna",
    "Joice",
    "Jojo",
    "Jolee",
    "Joleen",
    "Jolene",
    "Joletta",
    "Joli",
    "Jolie",
    "Joline",
    "Joly",
    "Jolyn",
    "Jolynn",
    "Jonell",
    "Joni",
    "Jonie",
    "Jonis",
    "Jordain",
    "Jordan",
    "Jordana",
    "Jordanna",
    "Jorey",
    "Jori",
    "Jorie",
    "Jorrie",
    "Jorry",
    "Joscelin",
    "Josee",
    "Josefa",
    "Josefina",
    "Josepha",
    "Josephina",
    "Josephine",
    "Josey",
    "Josi",
    "Josie",
    "Josselyn",
    "Josy",
    "Jourdan",
    "Joy",
    "Joya",
    "Joyan",
    "Joyann",
    "Joyce",
    "Joycelin",
    "Joye",
    "Jsandye",
    "Juana",
    "Juanita",
    "Judi",
    "Judie",
    "Judith",
    "Juditha",
    "Judy",
    "Judye",
    "Juieta",
    "Julee",
    "Juli",
    "Julia",
    "Juliana",
    "Juliane",
    "Juliann",
    "Julianna",
    "Julianne",
    "Julie",
    "Julienne",
    "Juliet",
    "Julieta",
    "Julietta",
    "Juliette",
    "Julina",
    "Juline",
    "Julissa",
    "Julita",
    "June",
    "Junette",
    "Junia",
    "Junie",
    "Junina",
    "Justina",
    "Justine",
    "Justinn",
    "Jyoti",
    "Kacey",
    "Kacie",
    "Kacy",
    "Kaela",
    "Kai",
    "Kaia",
    "Kaila",
    "Kaile",
    "Kailey",
    "Kaitlin",

    "Kellina",
    "Kellsie",
    "Kelly",
    "Kellyann",
    "Kelsey",
    "Kelsi",
    "Kelsy",
    "Kendra",
    "Kendre",
    "Kenna",
    "Keri",
    "Keriann",
    "Kerianne",
    "Kerri",
    "Kerrie",
    "Kerrill",
    "Kerrin",
    "Kerry",
    "Kerstin",
    "Kesley",
    "Keslie",
    "Kessia",
    "Kessiah",
    "Ketti",
    "Kettie",
    "Ketty",
    "Kevina",
    "Kevyn",
    "Ki",
    "Kiah",
    "Kial",
    "Kiele",
    "Kiersten",
    "Kikelia",
    "Kiley",
    "Kim",
    "Kimberlee",
    "Kimberley",
    "Kimberli",
    "Kimberly",
    "Kimberlyn",
    "Kimbra",
    "Kimmi",
    "Kimmie",
    "Kimmy",
    "Kinna",
    "Kip",
    "Kipp",
    "Kippie",
    "Kippy",
    "Kira",
    "Kirbee",
    "Kirbie",
    "Kirby",
    "Kiri",
    "Kirsten",
    "Kirsteni",
    "Kirsti",
    "Kirstin",
    "Kirstyn",
    "Kissee",
    "Kissiah",
    "Kissie",
    "Kit",
    "Kitti",
    "Kittie",
    "Kitty",
    "Kizzee",
    "Kizzie",
    "Klara",
    "Klarika",
    "Klarrisa",
    "Konstance",
    "Konstanze",
    "Koo",
    "Kora",
    "Koral",
    "Koralle",
    "Kordula",
    "Kore",
    "Korella",
    "Koren",
    "Koressa",
    "Kori",
    "Korie",
    "Korney",
    "Korrie",
    "Korry",
    "Kris",
    "Krissie",
    "Krissy",
    "Krista",
    "Kristal",
    "Kristan",
    "Kriste",
    "Kristel",
    "Kristen",
    "Kristi",
    "Kristien",
    "Kristin",
    "Kristina",
    "Kristine",
    "Kristy",
    "Kristyn",
    "Krysta",
    "Krystal",
    "Krystalle",

    "Lucilia",
    "Lucille",
    "Lucina",
    "Lucinda",
    "Lucine",
    "Lucita",
    "Lucky",
    "Lucretia",
    "Lucy",
    "Ludovika",
    "Luella",
    "Luelle",
    "Luisa",
    "Luise",
    "Lula",
    "Lulita",
    "Lulu",
    "Lura",
    "Lurette",
    "Lurleen",
    "Lurlene",
    "Lurline",
    "Lusa",
    "Luz",
    "Lyda",
    "Lydia",
    "Lydie",
    "Lyn",
    "Lynda",
    "Lynde",
    "Lyndel",
    "Lyndell",
    "Lyndsay",
    "Lyndsey",
    "Lyndsie",
    "Lyndy",
    "Lynea",
    "Lynelle",
    "Lynett",
    "Lynette",
    "Lynn",
    "Lynna",
    "Lynne",
    "Lynnea",
    "Lynnell",
    "Lynnelle",
    "Lynnet",
    "Lynnett",
    "Lynnette",
    "Lynsey",
    "Lyssa",
    "Mab",
    "Mabel",
    "Mabelle",
    "Mable",
    "Mada",
    "Madalena",
    "Madalyn",
    "Maddalena",
    "Maddi",
    "Maddie",
    "Maddy",

    "Moselle",
    "Moyna",
    "Moyra",
    "Mozelle",
    "Muffin",
    "Mufi",
    "Mufinella",
    "Muire",
    "Mureil",
    "Murial",
    "Muriel",
    "Murielle",
    "Myra",
    "Myrah",
    "Myranda",
    "Myriam",
    "Myrilla",
    "Myrle",
    "Myrlene",
    "Myrna",
    "Myrta",
    "Myrtia",
    "Myrtice",
    "Myrtie",
    "Myrtle",
    "Nada",
    "Nadean",
    "Nadeen",
    "Nadia",
    "Nadine",
    "Nadiya",
    "Nady",
    "Nadya",
    "Nalani",
    "Nan",
    "Nana",
    "Nananne",
    "Nance",

    "Nichole",
    "Nicholle",
    "Nicki",
    "Nickie",
    "Nicky",
    "Nicol",
    "Nicola",
    "Nicole",
    "Nicolea",
    "Nicolette",
    "Nicoli",
    "Nicolina",
    "Nicoline",
    "Nicolle",
    "Nikaniki",
    "Nike",
    "Niki",
    "Nikki",
    "Nikkie",
    "Nikoletta",
    "Nikolia",
    "Nina",
    "Ninetta",
    "Ninette",
    "Ninnetta",
    "Ninnette",
    "Ninon",
    "Nissa",
    "Nisse",
    "Nissie",
    "Nissy",
    "Nita",
    "Nixie",
    "Noami",
    "Noel",
    "Noelani",
    "Noell",
    "Noella",
    "Noelle",
    "Noellyn",
    "Noelyn",
    "Noemi",
    "Nola",
    "Nolana",
    "Nolie",
    "Nollie",
    "Nomi",
    "Nona",
    "Nonah",
    "Noni",
    "Nonie",
    "Nonna",
    "Nonnah",
    "Nora",
    "Norah",
    "Norean",
    "Noreen",
    "Norene",
    "Norina",
    "Norine",
    "Norma",
    "Norri",
    "Norrie",
    "Norry",
    "Novelia",
    "Nydia",
    "Nyssa",
    "Octavia",
    "Odele",
    "Odelia",
    "Odelinda",
    "Odella",
    "Odelle",
    "Odessa",
    "Odetta",
    "Odette",
    "Odilia",

    "Orelia",
    "Orelie",
    "Orella",
    "Orelle",
    "Oriana",
    "Orly",
    "Orsa",
    "Orsola",
    "Ortensia",
    "Otha",
    "Othelia",
    "Othella",
    "Othilia",
    "Othilie",
    "Ottilie",

    "Polly",
    "Pollyanna",
    "Pooh",
    "Poppy",
    "Portia",
    "Pris",
    "Prisca",
    "Priscella",
    "Priscilla",
    "Prissie",
    "Pru",
    "Prudence",
    "Prudi",
    "Prudy",
    "Prue",
    "Queenie",
    "Quentin",
    "Querida",
    "Quinn",
    "Quinta",
    "Quintana",
    "Quintilla",
    "Quintina",
    "Rachael",
    "Rachel",
    "Rachele",
    "Rachelle",
    "Rae",
    "Raeann",

    "Rosalinda",
    "Rosalinde",
    "Rosaline",
    "Rosalyn",
    "Rosalynd",
    "Rosamond",
    "Rosamund",
    "Rosana",
    "Rosanna",
    "Rosanne",
    "Rose",
    "Roseann",
    "Roseanna",
    "Roseanne",
    "Roselia",
    "Roselin",
    "Roseline",
    "Rosella",
    "Roselle",
    "Rosemaria",
    "Rosemarie",
    "Rosemary",
    "Rosemonde",
    "Rosene",
    "Rosetta",
    "Rosette",
    "Roshelle",
    "Rosie",
    "Rosina",
    "Rosita",
    "Roslyn",
    "Rosmunda",
    "Rosy",
    "Row",
    "Rowe",
    "Rowena",
    "Roxana",
    "Roxane",
    "Roxanna",
    "Roxanne",
    "Roxi",
    "Roxie",
    "Roxine",
    "Roxy",
    "Roz",
    "Rozalie",
    "Rozalin",
    "Rozamond",
    "Rozanna",
    "Rozanne",
    "Roze",
    "Rozele",
    "Rozella",
    "Rozelle",
    "Rozina",
    "Rubetta",
    "Rubi",
    "Rubia",
    "Rubie",
    "Rubina",
    "Ruby",
    "Ruperta",
    "Ruth",
    "Ruthann",
    "Ruthanne",
    "Ruthe",
    "Ruthi",
    "Ruthie",
    "Ruthy",
    "Ryann",
    "Rycca",
    "Saba",
    "Sabina",
    "Sabine",
    "Sabra",
    "Sabrina",
    "Sacha",
    "Sada",
    "Sadella",

    "Sula",
    "Sunny",
    "Sunshine",
    "Susan",
    "Susana",
    "Susanetta",
    "Susann",
    "Susanna",
    "Susannah",
    "Susanne",
    "Susette",
    "Susi",
    "Susie",
    "Susy",
    "Suzann",
    "Suzanna",
    "Suzanne",
    "Suzette",
    "Suzi",
    "Suzie",
    "Suzy",
    "Sybil",
    "Sybila",
    "Sybilla",
    "Sybille",
    "Sybyl",
    "Sydel",
    "Sydelle",
    "Sydney",
    "Sylvia",
    "Tabatha",
    "Tabbatha",
    "Tabbi",

    "Trisha",
    "Trista",
    "Trix",
    "Trixi",
    "Trixie",
    "Trixy",
    "Truda",
    "Trude",
    "Trudey",
    "Trudi",
    "Trudie",
    "Trudy",
    "Trula",
    "Tuesday",
    "Twila",
    "Twyla",
    "Tybi",
    "Tybie",
    "Tyne",
    "Ula",
    "Ulla",
    "Ulrica",
    "Ulrika",
    "Ulrikaumeko",
    "Ulrike",
    "Umeko",
    "Una",
    "Ursa",
    "Ursala",
    "Ursola",
    "Ursula",
    "Ursulina",
    "Ursuline",
    "Uta",
    "Val",
    "Valaree",

    "Verina",
    "Verine",
    "Verla",
    "Verna",
    "Vernice",
    "Veronica",
    "Veronika",
    "Veronike",
    "Veronique",
    "Vevay",
    "Vi",
    "Vicki",
    "Vickie",
    "Vicky",
    "Victoria",
    "Vida",
    "Viki",
    "Vikki",
    "Vikky",
    "Vilhelmina",
    "Vilma",
    "Vin",
    "Vina",
    "Vinita",
    "Vinni",
    "Vinnie",
    "Vinny",
    "Viola",
    "Violante",
    "Viole",
    "Violet",
    "Violetta",
    "Violette",
    "Virgie",
    "Virgina",
    "Virginia",
    "Virginie",
    "Vita",
    "Vitia",
    "Vitoria",
    "Vittoria",
    "Viv",
    "Viva",
    "Vivi",
    "Vivia",
    "Vivian",
    "Viviana",
    "Vivianna",
    "Vivianne",
    "Vivie",
    "Vivien",
    "Viviene",
    "Vivienne",
    "Viviyan",
    "Vivyan",
    "Vivyanne",
    "Vonni",
    "Vonnie",
    "Vonny",
    "Vyky",
    "Wallie",
    "Wallis",
    "Walliw",
    "Wally",
    "Waly",
    "Wanda",
    "Wandie",
    "Wandis",
    "Waneta",
    "Wren",
    "Wrennie",
    "Wylma",
    "Wynn",
    "Wynne",
    "Wynnie",
    "Wynny",
    "Xaviera",
    "Xena",
    "Xenia",
    "Xylia",
    "Xylina",
    "Yalonda",
    "Yasmeen",
    "Yasmin",
    "Yelena",
    "Yetta",
    "Yettie",
    "Yetty",
    "Yevette",
    "Ynes",
    "Ynez",
    "Yoko",
    "Yolanda",
    "Yolande",
    "Yolane",
    "Yolanthe",
    "Yoshi",
    "Yoshiko",
    "Yovonnda",
    "Ysabel",
    "Yvette",
    "Yvonne",
    "Zabrina",
    "Zahara",
    "Zandra",
    "Zaneta",
    "Zara",
    "Zarah",
    "Zaria",
    "Zarla",
    "Zea",
    "Zelda",
    "Zelma",
    "Zena",
    "Zenia",
    "Zia",
    "Zilvia",
    "Zita",
    "Zitella",
    "Zoe",
    "Zola",
    "Zonda",
    "Zondra",
    "Zonnya",
    "Zora",
    "Zorah",
    "Zorana",
    "Zorina",
    "Zorine",
    "Zsa Zsa",
    "Zsazsa",
    "Zulema",
    "Zuzana"
]

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'event_management.settings')
django.setup()

User = get_user_model()


def add_user():
    print("Role Choices are: \n0.Student \n1.Teacher \n2.HOD \n3.Dean \n4.VC")
    role = input('Enter the role [0]: ')
    if role == '':
        role = 0
    else:
        role = int(role)

    admin = input("Want the user to be admin (1/0) [1]: ")
    if admin == '':
        admin = True
    else:
        admin = bool(int(admin))

    branch = int(input("Enter Branch ID: "))
    password = input("Enter Password: ")
    no_of_user = int(input("Enter the number of user you want to create: "))

    last_id = User.objects.last()
    if not last_id:
        last_id = 0
    else:
        last_id = int(last_id.college_id) + 1

    to_update = []
    email_domain = [
        'gmail.com', 'event.com', 'sathyabama.ac.in', 'yahoo.in'
    ]
    for i in range(no_of_user):

        first_name = random.choice(names)
        last_name = random.choice(names)
        email_id = f"{first_name} {last_name}@{random.choice(email_domain)}"
        email_id = email_id.replace(' ', "_").replace("-", '_').lower()
        user = User(
            first_name=first_name,
            last_name=last_name,
            college_id=i+last_id,
            email=email_id,
            role=role,
            is_staff=admin,
            is_superuser=admin,
            branch_id=branch
        )
        user.set_password(password)
        to_update.append(user)
    with transaction.atomic():
        User.objects.bulk_create(to_update)
    print(f"Created {no_of_user} User with Role {role}")


if __name__ == '__main__':
    add_user()
