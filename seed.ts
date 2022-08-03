/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'dotenv/config';
import { uniq } from 'lodash';
import { Types } from 'mongoose';
import schema from './api/loader/schema';

enum Days {
  SUN = 'SUN',
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
}

type ClassroomData = {
  newCollection?: boolean;
  name: string;
  notice?: string;
  description: string;
  coverImg?: string;
  iconImg?: string;
  rating: {
    grade: string;
    difficulty?: number;
    educational?: number;
    fun?: number;
  };
  classTimes: { [key in Days]?: string[] }[];
  bookList: {
    bookShelfName: string;
    booksImg?: string;
  }[];
  enrollName: string;
};

const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );

const bookData = [
  [
    'Jonathan W Stokes',
    '2016',
    'Archeology',
    '336 pages',
    'Junior World Class',
  ],
  [
    'George Orwell',
    '1945',
    'Allegory, Political Satire',
    '112 pages',
    'Senior Classic Class',
  ],
  ['David Skuy', '2019', 'Adventure', '216 Pages', 'Junior Modern Class'],
  [
    'James Patterson, Kwame Alexander',
    '2001',
    'Biographical Novel, Poetry',
    '269 Pages',
    'Junior Kings Class',
  ],
  [
    'Carolyn Meyer',
    '2001',
    'Historical Fiction',
    '239 Pages',
    'Junior Kings Class',
  ],
  [
    'Markus Zusak',
    '2005',
    'Historical Fiction',
    '584 Pages',
    'Senior Classic Class',
  ],
  [
    'Deborah Ellis',
    '2000',
    'Injustice',
    '195 Pages',
    'Junior World Class, English Learner Class',
  ],
  ['T V Padma', '2019', 'Poverty', '208 Pages', 'Senior World Class'],
  [
    'Katherine Paterson',
    '1977',
    'Coming of Age',
    '208 pages',
    'Junior Classic Class',
  ],
  [
    'Christopher Paul Curtis',
    '1999',
    'Historical Fiction',
    '225 pages',
    'Junior Road Class',
  ],
  [
    'Jeanne DuPrau',
    '2003',
    'Science Fiction',
    '270 Pages',
    'Junior Classic Class, English Learner Class',
  ],
  [
    'Greg Van Eekhout',
    '2019',
    'Science Fiction, Adventure Fiction',
    '224 Pages',
    'Junior Meta Class',
  ],
  [
    'Beverly Cleary',
    '1983',
    'Epistolary Novel',
    '160 Pages',
    'Junior Newbery Class, English Learner Class',
  ],
  ['Andrea Curtis', '2017', 'Non-Fiction', '37 pages', 'Junior Modern Class'],
  [
    'Leila Rasheed',
    '2020',
    'Historical Fiction',
    '208 Pages',
    'Junior Kings Class',
  ],
  ['Kat Zhang', '2017', 'Mystery', '146 Pages', 'Senior World Class'],
  [
    'Orson Scott Card',
    '1985',
    'Science Fiction',
    '324 Pages',
    'Senior Road Class',
  ],
  [
    'Pam Muñoz Ryan',
    '2000',
    'Historical Fiction, Biography, Tragedy',
    '259 Pages',
    'Junior Meta Class',
  ],
  [
    'Sungju Lee, Susan McClelland',
    '2016',
    'Non-Fiction',
    '344 Pages',
    'Senior Modern Class',
  ],
  ['Candace Fleming', '2014', 'Non-Fiction', '304 Pages', 'Senior Kings Class'],
  [
    'Joyce Sidman',
    '2018',
    'Artistic Biography',
    '160 Pages',
    'Senior Meta Class',
  ],
  ['Sophie Anderson', '2019', 'Fiction', '304 Pages', 'Junior Meta Class'],
  [
    'Hans Christian Andersen',
    '2014',
    'Anthology',
    '164 Pages',
    'English Learner Class',
  ],
  ['J R R Tolkien', '1937', 'Fantasy', '310 Pages', 'Senior Classic Class'],
  ['Arthur Conan Doyle', '1902', 'Mystery', '198 Pages', 'Senior High Class'],
  [
    'Diana Wynne Jones',
    '1986',
    'Fantasy Fiction',
    '212 Pages',
    'Senior Meta Class',
  ],
  ['Trevor Noah', '2019', 'Apartheid', '308 Pages', 'Senior World Class'],
  [
    'Alison Matthews-David',
    '2019',
    'Non-Fiction',
    '48 pages',
    'Senior Modern Class',
  ],
  [
    'C S Lewis',
    '1950',
    'Fantasy',
    '208 Pages',
    'Junior Classic Class, English Learner Class',
  ],
  [
    'Linda Sue Park',
    '2010',
    'Based on a True Story',
    '128 pages',
    'Senior Road Class',
  ],
  [
    'William Golding',
    '1954',
    'Allegorical Novel',
    '250 pages',
    'Senior High Class',
  ],
  [
    'Franz Kafka',
    '1915',
    'German Fantasy Fiction, Absurdist Fiction',
    '58 pages',
    '',
  ],
  [
    'William Shakespeare',
    '1599, 2003',
    'Historical Drama, Play Script',
    '256 Pages',
    'Senior Kings Class',
  ],
  [
    'William Shakespeare',
    '1597, 2003',
    'Historical Drama, Play Script',
    '304 Pages',
    'Senior High Class',
  ],
  [
    'Lois Lowry',
    '1989',
    'Historical Fiction',
    '137 pages',
    'Junior Classic Class, English Learner Class',
  ],
  ['Wesley King', '2016', 'Psychology', '304 Pages', 'Junior Modern Class'],
  ['Philippa Dowding', '2018', 'Dystopia', '208 Pages', 'Senior Modern Class'],
  [
    'Homer, Robert Fagles',
    '1997',
    'Epic Poetry',
    '541 Pages',
    'Senior High Class',
  ],
  ['Edward Snowden', '2019', 'Non-fiction', '256 pages', 'Senior Road Class'],
  ['J M Barrie', '1904', 'Fantasy', '208 pages', 'Junior Meta Class'],
  ['Christina Diaz', '2011', 'Communism', '304 Pages', 'Senior World Class'],
  ['Dan Gemeinhart', '2019', 'Road Fiction', '352 pages', 'Senior Road Class'],
  ['Gordon Korman', '2017', 'Fiction', '256 pages', 'Senior Meta Class'],
  ['Emma Carroll', '2018', 'Egyptology', '234 Pages', 'Junior World Class'],
  [
    'Edith Nesbit',
    '2006',
    'Compilation Works',
    '82 Pages',
    'Junior Kings Class, English Learner Class',
  ],
  [
    'Michael Morpurgo',
    '2012',
    'Historical Fiction',
    '256 pages',
    'Junior Road Class',
  ],
  ['Karen Blumenthal', '2012', 'Biography', '320 Pages', 'Senior Kings Class'],
  ['Hugh Lofting', '1920', 'Fantasy', '180 pages', 'Junior Modern Class'],
  [
    'Robert Louis Stevenson',
    '1886',
    'Mystery',
    '120 Pages',
    'Senior Classic Class',
  ],
  ['T H White', '1963', 'Fantasy', '304 Pages', 'Senior Meta Class'],
  [
    'Kate DiCamillo',
    '2003',
    'Adventure',
    '272 Pages',
    'Junior Newbery Class, English Learner Class',
  ],
  [
    'Cornelia Funke',
    '2003',
    'Arts and Culture',
    '345 Pages',
    'Junior World Class, English Learner Class',
  ],
  [
    'Lorna Schultz',
    '2018',
    'Coming of Age',
    '201 pages',
    'Senior Modern Class',
  ],
  ['Art Slade', '2007', 'Informative', '96 pages', 'Senior Modern Class'],
  ['Ellen Raskin', '1978', 'Mystery', '192 Pages', 'Junior Newbery Class'],
  [
    'Peter Brown',
    '2016',
    'Science Fiction',
    '320 Pages',
    'Junior Modern Class',
  ],
  ['Tae Keller', '2020', 'Asian Fiction', '304 Pages', 'Junior Newbery Class'],
  [
    'Wesley King',
    '2018',
    'Adventure Fiction',
    '288 Pages',
    'Senior Kings Class',
  ],
  [
    "Madeleine L'Engle",
    '1962',
    'Science-Fantasy',
    '256 pages',
    'Junior Road Class',
  ],
].map(([authors, yearStr, themes, pageStr, classes]) => ({
  authors: authors
    .split(',')
    .map(author => toTitleCase(author.toLowerCase().trim())),
  year: parseInt(yearStr, 10),
  themes: themes
    .split(',')
    .map(theme => toTitleCase(theme.toLowerCase().trim())),
  pages: parseInt(pageStr, 10),
  classes: classes
    .split(',')
    .map(classs => toTitleCase(classs.toLowerCase().trim()))
    .filter(Boolean),
}));

const bookNameData = [
  { name: 'Addison Cooke and the Treasure of the Incas' },
  { name: 'Animal Farm' },
  { name: 'The Band of Merry Kids' },
  { name: 'Becoming Muhammad Ali' },
  { name: 'Beware, Princess Elizabeth' },
  { name: 'The Book Thief' },
  { name: 'The Breadwinner' },
  { name: 'The Bridge Home' },
  { name: 'Bridge to Terabithia' },
  { name: 'Bud, Not Buddy' },
  { name: 'The City of Ember' },
  { name: 'COG' },
  { name: 'Dear Mr. Henshaw' },
  { name: 'Eat This: How Food Marketing Gets You To Buy Junk' },
  { name: "Empire's End: A Roman Story" },
  { name: "The Emperor's Riddle" },
  { name: "Ender's Game" },
  { name: 'Esperanza Rising' },
  { name: 'Every Falling Star' },
  {
    name: 'The Family Romanov Murder, Rebellion & The Fall of Imperial Russia',
  },
  {
    name: "The Girl Who Drew Butterflies: How Maria Merian's Art Changed Science",
  },
  { name: 'The Girl Who Speaks Bear' },
  { name: 'Hans Christen Andersen Fairy Tales' },
  { name: 'The Hobbit' },
  { name: 'The Hound of Baskerville' },
  { name: "Howl's Moving Castle" },
  { name: "It's Trevor Noah: Born a Crime" },
  {
    name: 'Killer Style: How Fashion has Injured, Maimed & Murdered Through History',
  },
  { name: 'The Lion, The Witch and The Wardrobe' },
  { name: 'A Long Walk to Water' },
  { name: 'Lord of the Flies' },
  { name: 'The Metamorphosis' },
  { name: 'No Fear Shakespeare Julius Caesar' },
  { name: 'No Fear Shakespeare Romeo and Juliet' },
  { name: 'Number The Stars' },
  { name: 'OCDaniel' },
  { name: 'Oculum' },
  { name: 'The Odyssey ' },
  { name: 'Permanent Record' },
  { name: 'Peter Pan' },
  { name: 'The Red Umbrella' },
  { name: 'The Remarkable Journey of Coyote Sunshine' },
  { name: 'Restart' },
  { name: 'Secrets of a Sun King' },
  { name: "Shakespeare's Stories for Young Readers" },
  { name: 'The Sparrow story of Joan of Arc' },
  { name: 'Steve Jobs the Man Who Thought Different' },
  { name: 'The Story of Doctor Dolittle' },
  { name: 'The Strange Case of Dr. Jekyll and Mr. Hyde' },
  { name: 'The Sword in the Stone' },
  { name: 'The Tale of Despereaux' },
  { name: 'The Thief Lord' },
  { name: 'A Time to Run' },
  { name: 'Villianology: Fabulous Lives of the Big, Bad and the Wicked' },
  { name: 'The Westing Game' },
  { name: 'The Wild Robot' },
  { name: 'When You Trap a Tiger' },
  { name: 'A World Below' },
  { name: 'A Wrinkle in Time' },
];

const descriptions = [
  "An exciting book filled with adventure as Addison and his friends take off to South America to rescue his uncle and aunt. This book gives a sense of trials and victories through Stokes' storytelling. Students will also learn more about the culture and the ancient Incan Empire.",
  'What would it be like to be on a farm ran by animals? After all, all animals are equal, man is the enemy and a revolution is coming. Join Napoleon and Snowball as they progress on this farm to prove that they are much superior than humans. What can go wrong?',
  "Is it right to steal from the rich to give to the poor? This book is written about medieval Europe where a group of kids aspire to be like Robin Hood's Band of Merry Men. Skuy is an award-winning Canadian author who is continually writing for this series of books. ",
  "A critically acclaimed biographical novel of Muhammad Ali. This is a delightful story of Ali's childhood cowritten by the famous James Patterson written with narration and poetry. Students will learn to read poetry and understand racial injustice while tapping into the mind of a champion.",
  "King Henry VIII's daughter, Elizabeth Tudor, tells her story of her own quest to the throne that involves love, betrayal, and politics. Classes will go in-depth into the lineage of England's monarchy and how it shapes society even today.",
  'An international best seller with a historical backdrop regarding the horrors of the Nazi regime. It is written in the perspective of Death and his encounters with Liesel Meminger, a foster girl living in the outskirts of Munich. This superbly written story by Zusak has become a true classic of our time.',
  'This book gives us the perspective of an eleven-year-old girl living in Afghanistan who must transform herself into a boy to earn money and provide for the family. Classes will delve into the understanding of culture differences around the world. All sales of this book goes to Women for Women, an organization that supports health and education projects in Afghanistan.',
  'Would you rather have freedom to do what you want and risk the dangers that come with it or stability without the freedom along with expectations and systemic injustice? Students will discuss these questions as we engage in a story with  four homeless kids who experience the dangers and hardships of living on the streets in Chennai, India. ',
  'A Newberry Medal Winner. Jess and Leslie creates the magical kingdom of Terabithia in the woods and reign as King and Queen. Until one day, Leslie was there without Jess and a tragedy occurs. Students will explore the concepts of grief and the significance of building bridges to connect with others.',
  'Midwestern States in the 1930s is no joke. Backwards laws, poverty, racial injustice, and violence were just some of the experiences of Black Americans. On top of that,i t was the great depression. Yet in this midst of all this, the author of this book keeps it light and humorous through a child narrator Bud Caldwell while he searches for his father.',
  'This modern day classic illustrates a realistic post-apocalyptic setting where the City of Ember is the the only light in this dark world. It is built as the last bastion of survival and now, two hundred years later, its lights are starting to grow dim. Lina and Doon must find clues through an ancient message in hope of survival. If they fail, the lights will burn out forever.',
  'Although Cog looks like a normal twelve-year-old boy, He has only lived for 7 months--this is because he is a robot and COG is short for Cognitive Development as he was built to learn. Him and other robots go on an unforgettable journey as their programming becomes affected as a result.',
  "Leigh Botts composes letters to his favorite author, Boyd Henshaw about his hardships and struggles through his parents' divorce and pours his heart into these writing. The reader is reading the raw honesty of emotions from these events as they unfold in the form of epistles. This book is the winner of the Newbery Medal in 1984.",
  'An informative book with guides to educate students the importance of eating well , to be "media-literate", and to be able to make well informed decisions about the food that we put into our bodies. Many resources accompany this book for an interactive learning experience.',
  'Based on real historical events, the reader follows the story of Camilla as she travels with her mother and father to the center of the world, Rome, only to realize that they are dispatched to Britannica, the edge of the world. Along with the Empress, Camilla has to navigate this dangerous world of secrets that she now calls home.',
  'A fast paced mystery adventure that reveals the experience of Asian American identity and culture. Mia takes a family trip to China and looks forward to the idea of exploring and finding treasures with Aunt Lin. Then, Aunt Lin disappears and it is up to Mia and her brother Jake to uncover the riddles and find the lost treasure from the Ming Dynasty. ',
  "Winner of the Hugo and Nebula Awards, with a movie adaptation in 2013, Ender's Game has become another classic for young readers. At heart, it is a science fiction story about Alien attacks as Ender, a young genius, goes through rigorous training to become the military general to strategize the attacks as a last defense for humanity. ",
  "Esperanza, hope in Spanish, is a girl of  wealthy Mexican parents and due to a tragic incident, she moves to California with no money during the Great Depression where they are paid very little. The author's style is engaging and the themes of this book is very suited for classroom discussions.",
  'A true and captivating story of how a boy survived, escaped North Korea and lived to tell the tale. Sungju writes about his encounter with injustice, poverty and starvation in communist, North Korea. Students can join in on the discussion about the North Korean and South Korean divide.',
  'Award winning Candace Fleming tells a compelling story of the decline of last royal family and the factors that lead up to it. The meticulous research accompanied by various photographs will bring the characters to life and help readers engage with the narrative.',
  '17th-century German trailblazer Maria Merian was the leading botanical artist in the world as she illustrated insects in its developmental stages. The book shows the patience of a true scientist and what it took to raise insects. Accompanied with beautiful visuals, this book tells the fascinating story bring Merian out of the darkness into the light.',
  'Yanka, a big and strong girl is mocked for her unusual size and strength. She wakes up having actual bear legs and leaves her village. Where does she truly belong? What are the dangers that she will discover? Who is she really? There is something terrifying that could trapper in the forest forever.',
  "Anthology of of Andersen's classic fairy tales that have been translated into many languages that have been culturally impacting the West's collective consciousness. Perfect for English learners to are familiar with some of these timeless tales.",
  "Prequel to the Lord of the Rings trilogy, The Hobbit is the ultimate hero's journey as we follow Bilbo the hobbit, Gandalf the wizard and a company of dwarves on their quest to reclaim their stolen kingdom and gold. They will encounter Wizards, Trolls, Dragons, and Gollum who owned the ring of power. J R R Tolkien is the father of the fantasy genre and writes an ageless story for the young and old.",
  'This novella is the third of four crime books written by Sir Arthur Conan Doyle. The legendary detective Sherlock Holmes is commissioned to solve a murder case involving supernatural hell hounds along with his trusted companion Dr. Watson. It is a classic Sherlock Holmes story interpreted by many film and television media beloved by many.',
  'This Phoenix Award winning book was adapted into a Japanese Animation by Studio Ghibli in 2004. Young Sophie was transformed into an old lady and the spell can only be broken within an ever-moving castle. Sophie must learn about Howl, the owner of the castle and embarks on an adventure that is larger than life.',
  "Comedian Trevor Noah writes a memoir of his life in South Africa and his experience living through the apartheid. He was born a crime because his mother was black and his father was white, and it was against the law to be together. Trevor's story has been edited for younger readers who will laugh and cry at the unbelievable childhood accounts that Noah tells. ",
  'Fashion can be many things; art, style, function, comfort, status but can it even be a killer? An informative book about the dangers that were caused by fashion through history. This leads us to the question if there any killer styles that still exist today?',
  'The second book in the Chronicles of Narnia, this Christian fantasy told by C S Lewis in the 1950s has been adapted into media many times for a good reason. Four siblings enters a fantasy world through a wardrobe where a witch created an everlasting winter. However, there are rumors that Aslan the Lion, the just ruler of Narnia, is coming back.',
  'An impactful story told in two perspectives, Nya and Salva and their lives in South Sudan where there is very little water. First we are introduced to Nya, she walks twice a day to get water. We also get to know a boy named Salva from years before who is forced to leave his village in search of water as well.',
  'What happens when a group of boys are stranded on an uninhabited island to govern themselves? All hell breaks loose in this allegorical novel about innocence lost, morality and the human condition.',
  'This book is an allegorical novella written in the early 20th century about a man who sudden transforms into a grotesque creature. How does his family deal with it? This book is now more than 100 years old. Does it stand the test of time?',
  "The world's most popular author writes about the man who overthrew the world's most powerful empire of the day. No Fear Shakespeare bypasses the archaic language with a modern translation for students to understand the rise and fall of kings.",
  'No Fear Shakespeare explains to students the details of a classic romantic tragedy with the convenience of modern language for anyone to read. This would be perfect for students preparing for high school.',
  'A Newberry Medal Winner. A historical fiction written about Annamarie, whose family assists the escape of her Jewish friend during World War 2. Her resolve is tested when she has to confront Nazi soldiers in order to save everyone. This book depicts the heroism of an entire nation that allowed many Jewish families to escape to Sweden during a war torn period of history.',
  'Daniel, a twelve-year-old boy with obsessive compulsive disorder tries to hide his strange habits; until one day, he receives a note saying "I need your help" signed by Star Child. He gets caught up in a mystery that changes everything for him. Students will learn to identify with those who are feeling different and the importance of finding and being a friend who can understand.',
  'Oculum is a utopia, the perfect world with its domes, walls and gardens. One day Miranda1, a citizen of Oculum learns of a secret door hidden in its walls. While on the other side, Manfred and his friends struggle to survive in the ruins as they also find the door that leads into Oculum. Students will be introduced to the utopia and its dystopian realities.  ',
  "A story of heroism as readers follow Odysseus on his voyage back from the Trojan War. This story originates in 8th Century BCE and it certain stands the test of time as it is this Book Club's oldest book. The complexity of the story and its themes are intended for an older reading age.",
  "Edward Snowden, A real life spy reveals the secrets of the Central Intelligence Agency and National Security Agency of America. Now he's wanted by the United States government. Snowden's first book discuss topics like how we can private lives in a world that is becoming more and more obsessed with collecting data and personal information.",
  "Let's find Neverland together as we embark on this journey with Peter Pan, Wendy Darling, Tinker Bell and even Captain Hook! Needless to say timeless book was adapted in to a Disney Classic as well!",
  "Due to Fidel Castro's revolution, 14,000 unaccompanied children escape Cuba to America as part of Operation Pedro Pan. Lucia's life drastically changes when she and her brother had to leave her home country without her parents and adapt to a new country, learn a new language and live a new way of life. Author Christina Diaz captures the uncertainty and fear of many like Lucia during the time that she lived in.",
  '"Going home can sometimes be the hardest journey of all."',
  "If you had a chance to restart your life, how would you do it? That's what happened to Chase after he lost his memory when falling off the roof. What kind of person was he? How will it be different this time around? This book is written by #1 New York Times Best Seller Gordon Korman.",
  'An adventure story that weaves history and the mystery of ancient Egypt. In 1922, the world, along with 13-year-old Lilian Kaye, awaits for the discovery of the tomb of Tutankhamun. One morning, the news of a famous Egyptologist disappears and her grandfather is cursed with a sudden dangerous disease. Do you believe that curses exist? ',
  "Twelve of Shakespeares greatest works in a collection that is easy for young readers. Includes: Romeo and Juliet, Hamlet, King Lear, As You Like It, Twelfth Night, A Merchant Of Venice, The Tempest, A Midsummer Night's Dream, Cymbeline, The Taming of the Shrew, Pericles, and The Winter's Tale. Young readers will be exposed to classic stories that few at their age are able to know and understand.",
  'Fervor, determination, conviction. Did an ordinary girl really hear the voice of God to save her country? Eloise dives into this story itself as even time begins to fold and unfold the truth of the legend where the costs has never been forgotten.',
  "This biography tells the story of Steve Job's life from his adoption at birth to his battle with cancer over a decade. His ups and downs with the company, Apple, makes this man a perfect example of the rise and fall of kings in the modern age. ",
  'What is it like to own a menagerie? Dr. Dolittle can certainly tell you. After he is fed up with the everyday life in the small English village, he embarks on a voyage to Africa. Join him on his adventures through sea and exotic destinations as he finds some peculiar animals in a far away land...',
  'A London Lawyer named John Gabriel Utterson investigates a mysterious connection between a friend, Dr. Jekyll and the evil Edward Hyde. This gothic literature is a challenging classic for young readers and will enrich their vocabulary and understanding of Victorian London. ',
  'Inspired by the Arthurian legend, this classic tale of depicts a young boy who is transformed into something greater. Perfect for students who are interested in myth and legend and for any student who love fantasy, adventure and humor.',
  "This children's book depicts of a mouse manages to restore happiness to a faraway kingdom with the help of friends. In 2004, this book won the Newbery medal. It was adapted into a motion picture in 2008.",
  'Prosper and Bo are two brothers who ran away to the magical city of Venice. They are taken under the wings of the mysterious Thief Lord and together with their crew, embark on an unforgettable adventure to find a magical treasure that can spin time.',
  'Stuart is born with FASD (Fetal Alcohol Spectrum Disorder) and Sam is diagnosed with a dangerous heart condition. The story is about the importance of friendship and family as both learn to overcome their difficulties in high school. Readers will gain a understanding of people with special needs as they grow with the characters together.',
  "What makes a good villain? This book goes in-depths on some of the world's most notorious characters some fiction and some real such as The Wicked Witch of the West, Attila the Hun, The Wolf, Billy the Kid, The Headless Horseman, Morgan le Fay, Quin Hui, The Invisible Man, Scarface Capone. ",
  "16 heirs to Sam Westing's fortune tries to solve the puzzle which will gain control of Westing's business and millions of dollars. Ellen Raskin writes a witty murder mystery that is set in the 1970s. This book won the Newbery Medal in 1979 for best children's book.",
  "A Robot lands on an island and learns to survive in the wild. She learns to communicate with the wildlife and establishes community until one day the Robot's past comes to the island and threatens its very essence. A warm hearted book that explores the concept of identity and community written by New York Times Best Seller, Peter Brown.",
  "A magical tiger appears to Lily about her sick grandmother to unveil a secret family history. Lily's grandmother seemed to be in possession of something that belongs to the tiger and now the tiger wants to make a deal with Lily to reclaim what once belongs to him. This book won the Newberry Medal in 2021.",
  "Mr. Baker's eighth grade class goes on a field trip to Carlsbad Caverns when a sudden earthquake leaves the students trapped in the dark caves discovering a whole new society below. This book is told from three different points of views allowing readers to empathize with multiple characters who learn to face themselves.",
  "Meg Murry, her little brother, Charles Wallace and her classmate Calvin O'Keefe are guided by astral travellers that bring them on an adventure and ultimately to a planet that possess all the evil in the universe.",
];

const classroomData: ClassroomData[] = [
  {
    newCollection: true,
    name: 'Get Ready High School',
    notice: 'Senior Class Only (grade 8+)',
    description:
      'It is here! The course that will prepare students to think on a high school level. \nThe selected books for this course contain mature themes and intended for advanced readers. It is recommended for students grade 8 and up. This course will cover analysis, epic poetry, and Shakespeare. \nIf this is your first time in EverOak, please consult via email if you wish to enroll in this one.',
    rating: {
      grade: 'Senior High',
    },
    classTimes: [
      {
        MON: ['10:00', '11:15'],
        WED: ['10:00', '11:15'],
        FRI: ['10:00', '11:15'],
      },
      {
        MON: ['17:45', '19:00'],
        WED: ['17:45', '19:00'],
        FRI: ['17:45', '19:00'],
      },
    ],
    bookList: [{ bookShelfName: 'Senior High Course (grade 8+)' }],
    enrollName: 'Senior High',
  },
  {
    name: 'English Learners',
    notice: 'Senior Class Only (grade 7-8)',
    description:
      "For Junior English Learners, we recommend Junior Modern Classes. \nThis class was requested by many students who want to experience the joys of book club but are still learning English. The course will contain some of our favourite books from Junior but taught for grade 7 to 8s. Discussions topics will match student's levels and there will also be classes dedicated to teach writing. ",
    rating: {
      grade: 'Senior English Learner',
      difficulty: 3,
      educational: 4,
      fun: 2.5,
    },
    classTimes: [
      {
        MON: ['11:30', '12:30'],
        WED: ['11:30', '12:30'],
        FRI: ['11:30', '12:30'],
      },
      {
        MON: ['19:15', '20:30'],
        WED: ['19:15', '20:30'],
        FRI: ['19:15', '20:30'],
      },
    ],
    bookList: [
      { bookShelfName: 'Senior English Course (grade 7-8): Summer' },
      { bookShelfName: 'Senior English Course (grade 7-8): Spring' },
      { bookShelfName: 'Senior English Course (grade 7-8): Winter' },
    ],
    enrollName: 'English Learners',
  },
  {
    name: 'Canadian Modern',
    description:
      'This is an entry course for anyone who wants to get into reading. If you are an avid reader, you will enjoy this course as well. The books are all penned after 2016 by Canadian authors (except one who is a New York Times best seller). Students will explore themes that are important today without being bogged down by archaic languages. Discussions in this course allow students to connect deeper with others and the world developing empathy. ',
    rating: {
      grade: 'Junior Modern Course',
      difficulty: 2.5,
      educational: 2.5,
      fun: 4,
    },
    classTimes: [
      {
        MON: ['10:00', '11:15'],
        WED: ['10:00', '11:15'],
        FRI: ['10:00', '11:15'],
      },
      {
        MON: ['16:15', '17:30'],
        WED: ['16:15', '17:30'],
        FRI: ['16:15', '17:30'],
      },
      {
        MON: ['19:15', '20:30'],
        WED: ['19:15', '20:30'],
        FRI: ['19:15', '20:30'],
      },
    ],
    bookList: [{ bookShelfName: 'Junior Modern Books (grade 4-6)' }],
    enrollName: 'Junior Modern',
  },
  {
    name: 'Canadian Modern',
    description:
      'This is an entry course for anyone who wants to get into reading. If you are an avid reader, you will enjoy this course as well. The books are all penned after 2016 by Canadian authors (except one who is a New York Times best seller). Students will explore themes that are important today without being bogged down by archaic languages. Discussions in this course allow students to connect deeper with others and the world developing empathy. ',
    rating: {
      grade: 'Senior Modern Course',
      difficulty: 2.5,
      educational: 3,
      fun: 3.5,
    },
    classTimes: [
      {
        MON: ['11:30', '12:45'],
        WED: ['11:30', '12:45'],
        FRI: ['11:30', '12:45'],
      },
    ],
    bookList: [{ bookShelfName: 'Senior Modern Books (grade 7-8)' }],
    enrollName: 'Senior Modern',
  },
  {
    name: 'Newbery Medal',
    notice: 'Not offered this Summer Term *Junior Class Only (grade 4-6)',
    description:
      'This collection of books are all awarded with the Newbery Medal given to the author of the most distinguished contribution to American literature for children. The selected books are the winners for 1979, 1984, 2004 and 2020. We hope that these creative works of fiction will inspire young children to imagine and dream. ',
    rating: {
      grade: 'Junior Newbery Course',
      difficulty: 3,
      educational: 4,
      fun: 4,
    },
    classTimes: [],
    bookList: [{ bookShelfName: 'Junior Newbery Course (grade 4-6)' }],
    enrollName: 'Junior Newbery',
  },
];

(async () => {
  try {
    await schema.connect(process.env.MONGO_URI!);
    const { Author, AuthorBook, Book, Classroom, ClassroomBook } = schema;
    const modelsBulk = [Author, AuthorBook, Book, Classroom, ClassroomBook];
    // @ts-ignore
    await Promise.all(modelsBulk.map(model => model.deleteMany({})));

    // Data Create
    const authorNames = uniq(bookData.map(({ authors }) => authors).flat());
    const authorDocs = await Author.insertMany(
      authorNames.map(name => ({ name })),
    );
    const authorNameMap = authorDocs.reduce<Record<string, Types.ObjectId>>(
      (acc, cur) => {
        acc[cur.name] = cur._id;
        return acc;
      },
      {},
    );

    const classroomDocs = await Classroom.insertMany(classroomData);
    const classroomNameMap = classroomDocs.reduce<
      Record<string, Types.ObjectId>
    >((acc, cur) => {
      acc[`${cur.name} Class`] = cur._id;
      return acc;
    }, {});

    await Promise.all(
      bookNameData.map(async ({ name }, index) => {
        const { authors, year, themes, pages, classes } = bookData[index];
        const description = descriptions[index];
        const createdBook = await Book.create({
          name,
          year,
          themes,
          pages,
          description,
        });

        const authorIds = authors.map(authorName => authorNameMap[authorName]);
        await Promise.all(
          authorIds.map(author =>
            AuthorBook.create({ author, book: createdBook._id }),
          ),
        );

        const classroomIds = classes
          .map(classroomName => classroomNameMap[classroomName])
          .filter(Boolean);
        return Promise.all(
          classroomIds.map(classroom =>
            ClassroomBook.create({ classroom, book: createdBook._id }),
          ),
        );
      }),
    );
    console.log('done');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed DB', err);
    process.exit(1);
  }
})();
