/* StarkForgeX course catalog: course data and page rendering. Edit the C array to change course content. */
(() => {
const DEMO_LMS = '../demo/index.html';
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const P = {
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5', tree: 'M12 3v6M6 15v-3h12v3M4 15h4v6H4zM16 15h4v6h-4zM10 3h4v6h-4z', web: 'M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01',
  db: 'M12 9c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  cloud: 'M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.5 1.5A3.5 3.5 0 0 1 17.5 18z', ai: 'M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3M6 6h12v12H6zM10 10h4v4h-4z',
  calc: 'M6 3h12v18H6zM9 7h6M9 11h.01M12 11h.01M15 11h.01M9 14h.01M12 14h.01M15 14h.01M9 17h.01M12 17h.01M15 17h.01',
  chat: 'M4 5h16v11H9l-5 4z', brief: 'M4 8h16v12H4zM9 8V5h6v3M4 13h16',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2', cal: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4', level: 'M5 20v-4M10 20v-8M15 20v-12M20 20V4',
  arrow: 'M5 12h14M13 6l6 6-6 6', left: 'M19 12H5M11 6l-6 6 6 6', check: 'M5 12.5l4.5 4.5L19 7.5', down: 'M6 9l6 6 6-6', search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.5-4.5',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 14 7 21l5-3 5 3-1.5-7', book: 'M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5zM4 19.5A1.5 1.5 0 0 0 5.5 21H20',
  lab: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3', target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01',
  hammer: 'M14 6l4 4M3 21l9-9M13 3l8 8-3 3-8-8z', test: 'M9 3h6v3H9zM7 4.5H5V21h14V4.5h-2M8.5 13l2.5 2.5 4.5-4.5', users: 'M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.2a3.5 3.5 0 0 1 0 6.6',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
};
const ic = (n, s = 18, w = 1.8) => `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]}"/></svg>`;

const CATS = { technical: 'Technical', aptitude: 'Aptitude', soft: 'Soft skills', career: 'Career' };
const MOD_COLORS = ['#0B47E0', '#2E64F0', '#5B4BDB', '#0E8F86', '#0B7A4F', '#D9600B'];
const METHOD_ICON = { 0: 'book', 1: 'lab', 2: 'target', 3: 'test' };

/* ---- course data ---- */
const C = [
{ id: 'prog', name: 'Programming Foundations', icon: 'code', cat: 'technical', years: [1], sems: [1, 2], when: 'Year 1 · Semester 1–2', hours: 90, level: 'Beginner',
  summary: 'Builds logical thinking and core programming skills in C, Python and Java, so first-year students can write working programs with confidence.',
  forWho: 'First-year B.E./B.Tech students of all branches, including those who have never written code.', prereq: 'None. School-level mathematics is enough.',
  modules: [['Logic building', 10, ['Breaking a problem into steps', 'Flowcharts and pseudocode', 'Pattern and number problems', 'Dry-running code by hand']], ['C programming basics', 18, ['Data types, operators, input and output', 'Conditions and loops', 'Functions and scope', 'Finding and fixing common errors']], ['Arrays, strings and pointers', 16, ['One- and two-dimensional arrays', 'String handling', 'Pointers and memory addresses', 'Structures']], ['Python fundamentals', 20, ['Syntax, variables and control flow', 'Lists, tuples, dictionaries and sets', 'Functions and modules', 'Files and exceptions']], ['Java and OOP introduction', 14, ['Classes and objects', 'Constructors and methods', 'Encapsulation and inheritance basics', 'Compiling and running Java programs']], ['Mini project', 12, ['Breaking down requirements', 'Building a console application', 'Testing and code review', 'Presenting the project']]],
  split: [30, 55, 15], week: ['2 concept sessions of 1 hour', '2 lab sessions of 2 hours', '3 practice problems a day on the LMS', 'A 30-minute coding test every week'],
  methods: [['Concept sessions', 'Short explanations with diagrams and a worked example before any syntax.'], ['Lab sessions', 'Students write every program themselves, with trainers checking and guiding.'], ['Daily practice', 'Three graded problems a day on the LMS keep skills moving between classes.'], ['Weekly tests', 'Auto-graded coding tests show who needs help early.']],
  projects: [['Student grade manager', 'Beginner', 'A C program that stores marks, calculates grades and prints a class report.'], ['Quiz game', 'Beginner', 'A Python game with a question bank, scoring and a saved high-score file.'], ['Library book tracker', 'Beginner', 'A Java program that uses classes to issue, return and search books.']],
  assess: ['A 30-minute logic and aptitude test in week 1 places each student at the right starting level.', 'A 30-minute coding test every week on the LMS, checked automatically against hidden test cases.', 'A 2-hour lab exam with three programs to write and explain, plus the mini project review.'],
  grading: [['Weekly coding tests', 30], ['Lab work and assignments', 20], ['Mini project', 20], ['Final lab exam', 30]],
  tools: [['VS Code', 'Code editor'], ['GCC', 'C compiler'], ['Python 3', 'Programming language'], ['Java JDK', 'Java compiler and runtime'], ['HackerRank', 'Practice problems'], ['StarkForgeX LMS', 'Tests and progress']],
  skills: ['Break a problem into clear steps before coding', 'Write and debug programs in C and Python', 'Use arrays, strings, functions and files', 'Understand the basics of object-oriented programming', 'Solve 100+ logic problems of rising difficulty'],
  roles: ['Base for software developer roles', 'Software tester', 'Data analyst (with later courses)'],
  companies: 'Lays the base for coding rounds at service companies such as TCS, Infosys, Wipro and Cognizant.',
  lab: 'A computer lab with one system per student (or one per two students), internet access, and VS Code, GCC, Python 3 and the Java JDK installed. We send an installation checklist before the first session.' },

{ id: 'dsa', name: 'Data Structures & Algorithms', icon: 'tree', cat: 'technical', years: [2], sems: [3, 4], when: 'Year 2 · Semester 3–4', hours: 120, level: 'Intermediate',
  summary: 'Teaches the data structures and problem-solving patterns that company coding rounds test, through daily practice and timed contests.',
  forWho: 'Second-year CSE, IT, ECE and related students who are comfortable in one programming language.', prereq: 'Programming Foundations or equivalent: loops, functions and arrays in Java, C++ or Python.',
  modules: [['Complexity and arrays', 16, ['Big-O time and space complexity', 'Prefix sums and sliding window', 'Two-pointer problems', 'String problems']], ['Recursion, searching and sorting', 18, ['Recursion and the call stack', 'Binary search and its variations', 'Merge sort and quick sort', 'Backtracking basics']], ['Linked lists, stacks and queues', 20, ['Singly and doubly linked lists', 'Reversal, cycle detection and merging', 'Stacks and expression evaluation', 'Queues, deques and circular queues']], ['Trees, heaps and hashing', 24, ['Binary trees and traversals', 'Binary search trees', 'Heaps and priority queues', 'Hash maps and sets in problem solving']], ['Graphs', 18, ['Graph representation', 'Breadth-first and depth-first search', 'Shortest paths with Dijkstra', 'Topological sort and union-find']], ['Dynamic programming and interview sets', 24, ['Memoisation and tabulation', 'Knapsack, longest subsequence, grid paths', 'Greedy versus dynamic programming', 'Company-pattern problem sets']]],
  split: [25, 55, 20], week: ['2 concept sessions with visual dry runs', '2 live-coding labs of 2 hours', '3 problems a day on the LMS', 'A 60-minute timed contest every week'],
  methods: [['Visual dry runs', 'Every structure is drawn and traced step by step before code is written.'], ['Live coding', 'Trainers solve problems live, thinking aloud, then students solve a similar one.'], ['Daily practice', 'Three problems a day, sorted by pattern, so students build recognition.'], ['Weekly contests', 'Timed contests with a class leaderboard build speed and exam temperament.']],
  projects: [['Pathfinder visualiser', 'Intermediate', 'A grid app that shows breadth-first search, depth-first search and Dijkstra step by step.'], ['Autocomplete engine', 'Intermediate', 'Word suggestions built on a trie and tested on a real dictionary.'], ['Problem-solving log', 'Beginner', 'A GitHub repository of 150+ solved problems with a note on the pattern behind each.']],
  assess: ['A 45-minute test on arrays, strings and logic places students in the right practice track.', 'A weekly 60-minute contest with three problems of rising difficulty, ranked on the LMS.', 'A mock coding round: three problems in 90 minutes under company-style conditions, followed by a short explanation.'],
  grading: [['Weekly contests', 30], ['Daily practice', 20], ['Projects', 20], ['Mock coding round', 30]],
  tools: [['Java or Python', 'Language of choice'], ['VS Code', 'Code editor'], ['LeetCode', 'Practice problems'], ['HackerRank', 'Timed contests'], ['GitHub', 'Problem-solving log'], ['StarkForgeX LMS', 'Contests and progress']],
  skills: ['Choose the right data structure for a problem', 'Analyse time and space complexity', 'Solve medium-level problems within time limits', 'Explain an approach clearly in an interview', '150+ problems solved across all core topics'],
  roles: ['Software developer', 'SDE intern', 'Backend developer'],
  companies: 'Prepares students for coding rounds at service companies such as TCS, Infosys and Accenture, and at product companies such as Zoho and fast-growing startups.',
  lab: 'A computer lab with one system per student, internet access and VS Code with Java or Python installed. Practice platforms run in the browser.' },

{ id: 'web', name: 'Full-Stack Web Development', icon: 'web', cat: 'technical', years: [2, 3], sems: [4, 5, 6], when: 'Year 2 Sem 4 – Year 3 Sem 6', hours: 150, level: 'Intermediate',
  summary: 'Takes students from their first HTML page to a deployed full-stack application, built the way real development teams work.',
  forWho: 'Second- and third-year students who want to become web or full-stack developers.', prereq: 'Programming Foundations. Databases & SQL helps but is not required.',
  modules: [['HTML and CSS', 18, ['Semantic HTML', 'Flexbox and Grid layouts', 'Responsive design for phones', 'Accessibility basics']], ['JavaScript', 28, ['Variables, functions and arrays', 'The DOM and events', 'Fetching data from APIs', 'Modern JavaScript, promises and async/await']], ['React', 30, ['Components and props', 'State and hooks', 'Routing and forms', 'Calling APIs from React']], ['Node.js and Express', 26, ['Building REST APIs', 'Middleware and validation', 'Error handling', 'Testing APIs with Postman']], ['Databases and authentication', 22, ['Connecting to PostgreSQL or MongoDB', 'Data models and queries', 'Sign-up, login and JWT', 'Role-based access']], ['Capstone and deployment', 26, ['Planning features in sprints', 'Git workflow and code reviews', 'Deploying frontend and backend', 'Demo day presentation']]],
  split: [20, 60, 20], week: ['1 concept session', '3 build-along labs of 2 hours', 'A feature task pushed to GitHub', 'A code review every Friday'],
  methods: [['Build-along labs', 'Students build alongside the trainer, then extend the feature on their own.'], ['Code reviews', 'Weekly reviews on GitHub teach clean code and team habits.'], ['Sprint projects', 'Projects run in short sprints with a backlog, just like a real team.'], ['Demo day', 'Students present a live, deployed product to a panel.']],
  projects: [['Portfolio website', 'Beginner', 'A responsive personal site with projects and a contact section, live on the internet.'], ['Task manager app', 'Intermediate', 'A React app with a Node.js API to create, update and track tasks.'], ['Campus placement portal', 'Advanced', 'The capstone: student profiles, job drives, login and an admin dashboard, deployed online.']],
  assess: ['A short quiz on programming basics and a small HTML task.', 'Weekly feature tasks reviewed on GitHub, plus a 30-minute concept quiz on the LMS.', 'Capstone demo day: live demo, code walkthrough and questions from a panel.'],
  grading: [['Weekly feature tasks', 30], ['Concept quizzes', 15], ['Mini projects', 20], ['Capstone and demo day', 35]],
  tools: [['VS Code', 'Code editor'], ['Git and GitHub', 'Version control and reviews'], ['React', 'Frontend library'], ['Node.js and Express', 'Backend'], ['PostgreSQL or MongoDB', 'Database'], ['Postman', 'API testing'], ['Vercel or Render', 'Deployment']],
  skills: ['Build responsive websites that work on phones', 'Create React applications with state and routing', 'Build and test REST APIs', 'Add login and connect a database', 'Deploy and present a full-stack project'],
  roles: ['Frontend developer', 'Full-stack developer', 'Web developer intern'],
  companies: 'Prepares students for web and full-stack roles at IT services companies, SaaS companies such as Zoho and Freshworks, and startups.',
  lab: 'A computer lab with one system per student, reliable internet, VS Code, Node.js and Git installed, and permission to run local development servers.' },

{ id: 'sql', name: 'Databases & SQL', icon: 'db', cat: 'technical', years: [2], sems: [3], when: 'Year 2 · Semester 3', hours: 45, level: 'Beginner to intermediate',
  summary: 'Teaches students to design databases and write the SQL queries used in real applications and technical interviews.',
  forWho: 'Second-year students from CSE, IT and related branches.', prereq: 'Basic programming knowledge.',
  modules: [['ER modelling', 6, ['Entities, attributes and relationships', 'Primary and foreign keys', 'Drawing ER diagrams', 'Turning a diagram into tables']], ['SELECT basics', 7, ['SELECT, WHERE and ORDER BY', 'Built-in functions', 'Handling NULL values', 'INSERT, UPDATE and DELETE']], ['Joins', 8, ['Inner joins', 'Left, right and full joins', 'Self joins', 'Joining three or more tables']], ['Grouping and subqueries', 9, ['GROUP BY and HAVING', 'Aggregate functions', 'Subqueries and correlated subqueries', 'Views']], ['Design and performance', 7, ['Normalisation from 1NF to 3NF', 'Indexes', 'Transactions and ACID', 'Common interview questions']], ['Mini project', 8, ['Designing a college database', 'Writing 20 report queries', 'Review and optimisation', 'Presentation']]],
  split: [25, 60, 15], week: ['1 concept session', '2 lab sessions on real datasets', 'A daily SQL challenge on the LMS', 'A 30-minute query test every week'],
  methods: [['Query walkthroughs', 'Every query is built up line by line on a sample table.'], ['Real dataset labs', 'Students query realistic data: students, sales, libraries.'], ['Daily challenges', 'One SQL problem a day builds fluency.'], ['Weekly tests', 'Queries run against a live database and are checked automatically.']],
  projects: [['College management database', 'Intermediate', 'A schema for students, courses, marks and attendance, with 20 report queries.'], ['Sales analytics queries', 'Beginner', 'Business reports from a sample sales dataset: top products and monthly trends.'], ['Library system schema', 'Beginner', 'A normalised design for a library, with issue tracking and fine calculation.']],
  assess: ['A 15-minute quiz on data and tables.', 'A weekly 30-minute query test on a live database, checked automatically.', 'A practical exam: design a schema from a short brief and write 10 queries.'],
  grading: [['Weekly query tests', 35], ['Lab exercises', 20], ['Mini project', 20], ['Practical exam', 25]],
  tools: [['MySQL', 'Database'], ['PostgreSQL', 'Database'], ['DBeaver', 'Database client'], ['LeetCode SQL', 'Practice problems'], ['StarkForgeX LMS', 'Tests and progress']],
  skills: ['Design a normalised database from requirements', 'Write joins, grouping and subqueries with confidence', 'Use indexes and transactions correctly', 'Answer common SQL interview questions'],
  roles: ['Backend developer', 'Data analyst', 'Database developer', 'Software tester'],
  companies: 'SQL is tested in technical rounds at most service and product companies, and is the core skill for data analyst roles.',
  lab: 'A computer lab with MySQL or PostgreSQL and DBeaver installed. A shared lab server also works.' },

{ id: 'devops', name: 'Cloud & DevOps', icon: 'cloud', cat: 'technical', years: [4], sems: [7], when: 'Year 4 · Semester 7', hours: 60, level: 'Advanced',
  summary: 'Teaches final-year students how modern teams build, ship and run software, using Linux, Docker, CI/CD and the cloud.',
  forWho: 'Final-year students who have built at least one web or software project.', prereq: 'Programming Foundations and one completed project. Full-Stack Web Development is recommended.',
  modules: [['Linux and the shell', 10, ['Files, permissions and processes', 'Package management', 'Shell scripting basics', 'SSH and remote servers']], ['Git workflows', 8, ['Branches and merging', 'Pull requests and code reviews', 'Resolving conflicts', 'Team workflow on GitHub']], ['Docker', 12, ['Images and containers', 'Writing Dockerfiles', 'Docker Compose for multi-service apps', 'Container best practices']], ['CI/CD', 10, ['What CI/CD solves', 'GitHub Actions workflows', 'Automated tests in the pipeline', 'Automatic deployment']], ['Cloud basics', 10, ['Virtual servers and regions', 'Cloud storage and databases', 'Networking and security groups', 'Cost awareness and free tiers']], ['Deployment capstone', 10, ['Containerising a project', 'Building the full pipeline', 'Logging and basic monitoring', 'Final review']]],
  split: [25, 60, 15], week: ['1 concept session', '2 hands-on labs of 2 hours', 'A weekly pipeline task', 'A troubleshooting drill'],
  methods: [['Hands-on labs', 'Every command is run by the student on a real machine.'], ['Pipeline builds', 'Students automate testing and deployment for their own project.'], ['Troubleshooting drills', 'Broken setups are fixed in pairs, the way support teams work.'], ['Deployment review', 'Each student deploys and explains a live application.']],
  projects: [['Containerised web app', 'Intermediate', 'A full-stack project packaged with Docker Compose.'], ['CI/CD pipeline', 'Intermediate', 'A GitHub Actions pipeline that tests and deploys on every push.'], ['Cloud deployment', 'Advanced', 'A live application on a cloud server with logging and a public address.']],
  assess: ['A short quiz on Git and command-line basics.', 'Weekly lab checkpoints verified on each student’s own repository.', 'A live deployment review: deploy a given app end to end and explain each step.'],
  grading: [['Lab checkpoints', 30], ['Pipeline task', 20], ['Capstone deployment', 30], ['Final review', 20]],
  tools: [['Linux (Ubuntu)', 'Operating system'], ['Git and GitHub', 'Version control'], ['Docker', 'Containers'], ['GitHub Actions', 'CI/CD'], ['AWS free tier', 'Cloud platform']],
  skills: ['Work confidently on the Linux command line', 'Package applications in containers', 'Build an automated CI/CD pipeline', 'Deploy and monitor an application in the cloud'],
  roles: ['DevOps engineer trainee', 'Cloud support associate', 'Site reliability intern', 'Backend developer'],
  companies: 'Prepares students for DevOps and cloud roles at IT services companies, cloud consultancies and product engineering teams.',
  lab: 'A computer lab with internet access and permission to install Docker, or Linux virtual machines. Students create free-tier cloud accounts with guidance.' },

{ id: 'ai', name: 'AI, ML & Generative AI', icon: 'ai', cat: 'technical', years: [3], sems: [5, 6], when: 'Year 3 · Semester 5–6', hours: 75, level: 'Intermediate',
  summary: 'Introduces machine learning and generative AI, and teaches students to build AI features responsibly on top of strong fundamentals.',
  forWho: 'Third-year students who are comfortable with Python.', prereq: 'Python basics and school-level statistics.',
  modules: [['Python for data', 12, ['NumPy arrays', 'Pandas data frames', 'Cleaning real datasets', 'Charts with Matplotlib']], ['Machine learning basics', 16, ['Supervised and unsupervised learning', 'Linear and logistic regression', 'Decision trees and random forests', 'Clustering with k-means']], ['Model evaluation', 10, ['Train, validation and test splits', 'Accuracy, precision and recall', 'Overfitting and regularisation', 'Tuning hyperparameters']], ['Neural networks', 10, ['How a neural network learns', 'Building a simple network', 'Image and text examples', 'When deep learning is the right tool']], ['LLMs and prompt engineering', 12, ['How large language models work', 'Prompt design patterns', 'Using LLM APIs', 'Limits, bias and wrong answers']], ['AI application project', 15, ['Retrieval-based question answering', 'Building a chatbot or document assistant', 'Testing AI output', 'Responsible AI checklist']]],
  split: [30, 55, 15], week: ['2 concept sessions', '2 notebook labs', 'A weekly dataset challenge', 'A prompt workshop every two weeks'],
  methods: [['Notebook walkthroughs', 'Concepts are shown step by step in shared notebooks with real data.'], ['Dataset labs', 'Students clean, train and evaluate models themselves.'], ['Prompt workshops', 'Students compare prompts and learn to check AI output.'], ['Project demo', 'Each student builds and defends a working AI application.']],
  projects: [['Placement predictor', 'Intermediate', 'A model that predicts placement likelihood from sample student data, with an evaluation report.'], ['Review sentiment analyser', 'Intermediate', 'Classifies product reviews as positive or negative and explains the results.'], ['College helpdesk assistant', 'Advanced', 'A chatbot that answers questions from college documents using retrieval and an LLM API.']],
  assess: ['A quiz on Python and basic statistics.', 'Weekly notebook tasks checked automatically, plus a short concept quiz.', 'A project demo with a written model report and a viva on how the model works.'],
  grading: [['Notebook tasks', 30], ['Concept quizzes', 15], ['ML project', 25], ['AI app demo and viva', 30]],
  tools: [['Python and Jupyter', 'Notebooks'], ['Pandas and NumPy', 'Data handling'], ['scikit-learn', 'Machine learning'], ['LLM APIs', 'Generative AI'], ['AI coding assistants', 'Faster development'], ['GitHub', 'Project hosting']],
  skills: ['Clean and explore real datasets', 'Train and evaluate machine learning models', 'Write effective prompts and use LLM APIs', 'Build an AI application and test its answers', 'Use AI responsibly and explain its limits'],
  roles: ['ML engineer trainee', 'Data analyst', 'AI application developer', 'Data science intern'],
  companies: 'Prepares students for data and AI roles at IT services companies building AI practices, analytics firms and AI startups.',
  lab: 'A computer lab with internet access and Python with Jupyter installed. Cloud notebooks can be used instead of local installs.' },

{ id: 'apt', name: 'Aptitude & Reasoning', icon: 'calc', cat: 'aptitude', years: [1, 2, 3, 4], sems: [1, 2, 3, 4, 5, 6, 7, 8], when: 'Year 1 – Year 4 · every semester', hours: 100, level: 'All levels',
  summary: 'Builds the speed and accuracy students need to clear company aptitude rounds, with a short daily test from first year to final year.',
  forWho: 'All students from Year 1 to Year 4, all branches.', prereq: 'None.',
  modules: [['Numbers and percentages', 16, ['Number system and divisibility', 'Percentages', 'Averages', 'HCF and LCM']], ['Commercial mathematics', 16, ['Ratio and proportion', 'Profit, loss and discount', 'Simple and compound interest', 'Partnership and mixtures']], ['Time-based problems', 18, ['Time and work', 'Pipes and cisterns', 'Time, speed and distance', 'Trains, boats and streams']], ['Logical reasoning', 20, ['Number and letter series', 'Coding and decoding', 'Blood relations and directions', 'Seating arrangements and puzzles']], ['Verbal ability', 15, ['Grammar and error spotting', 'Reading comprehension', 'Vocabulary', 'Sentence completion and para jumbles']], ['Company mock tests', 15, ['Service-company test patterns', 'Time management strategy', 'Full-length timed mocks', 'Reviewing mistakes']]],
  split: [25, 50, 25], week: ['1 class of 2 hours with shortcut methods', 'A 10-question test every day on the LMS', 'A topic quiz after every chapter', 'A full-length mock every month'],
  methods: [['Shortcut methods', 'Each topic is taught with the fastest reliable method, not long derivations.'], ['Timed practice', 'Every practice set has a timer, so speed improves with accuracy.'], ['Daily LMS test', 'Ten questions a day, every day, from first year to final year.'], ['Monthly mocks', 'Full company-pattern tests with a topic-wise analysis.']],
  projTitle: 'Practice work',
  projects: [['Personal formula book', 'Beginner', 'Each student builds a shortcut sheet for every topic as the course goes on.'], ['Error log', 'Beginner', 'Every wrong answer is logged on the LMS with the correct method, and revised weekly.'], ['Mock test series', 'Intermediate', '12 full-length company-pattern tests with a performance analysis after each.']],
  assess: ['A full aptitude test in the first week, used as the reference for all later improvement.', 'Daily 10-question tests and a 30-minute topic test every week.', 'A full-length company-pattern mock test at the end of each year.'],
  grading: [['Daily tests', 30], ['Weekly topic tests', 30], ['Monthly mocks', 20], ['Year-end mock', 20]],
  tools: [['StarkForgeX LMS', 'Daily tests and analysis'], ['Shortcut sheets', 'Topic-wise methods'], ['Question bank', 'Graded by topic and difficulty']],
  skills: ['Solve aptitude questions with fast, reliable methods', 'Manage time well in a timed test', 'Reason through puzzles and arrangements', 'Answer verbal questions accurately'],
  roles: ['Every placement process: aptitude is the first round at most companies'],
  companies: 'Prepares students for aptitude rounds at TCS (NQT), Infosys, Wipro, Cognizant, Accenture, Capgemini and many others.',
  lab: 'A classroom with a projector. Daily tests run on students’ phones or in the computer lab.' },

{ id: 'comm', name: 'Communication Skills', icon: 'chat', cat: 'soft', years: [1, 2, 3], sems: [1, 2, 3, 4, 5, 6], when: 'Year 1 – Year 3', hours: 60, level: 'All levels',
  summary: 'Helps students speak confidently, write professionally and perform well in group discussions and interviews.',
  forWho: 'Students from Year 1 to Year 3 in all branches, especially those less confident in English.', prereq: 'None.',
  modules: [['Confidence and self-introduction', 8, ['A clear 60-second introduction', 'Body language and eye contact', 'Handling stage fear', 'Voice and pace']], ['Spoken English', 14, ['Everyday and workplace conversations', 'Listening practice', 'Pronunciation and clarity', 'Common errors and how to fix them']], ['Professional writing', 10, ['Email structure and tone', 'Reports and summaries', 'LinkedIn profile and posts', 'Messaging etiquette at work']], ['Group discussion', 10, ['How GDs are evaluated', 'Opening, adding value and summarising', 'Handling disagreement politely', 'Practice GDs on current topics']], ['Presentations', 10, ['Structuring a talk', 'Simple, clear slides', 'Delivery and handling questions', 'Team presentations']], ['Workplace skills', 8, ['Meetings and calls', 'Teamwork and feedback', 'Time management', 'Professional etiquette']]],
  split: [20, 70, 10], week: ['1 interactive session of 2 hours', 'Speaking practice recorded on the phone', 'A GD or role play every two weeks', 'A short written task each week'],
  methods: [['Role plays', 'Real situations: interviews, client calls, team meetings.'], ['Recorded practice', 'Students record themselves, review and improve.'], ['GD rounds', 'Regular discussions in groups of 8 to 10 with scored feedback.'], ['Peer feedback', 'Students learn to give and take feedback with a simple rubric.']],
  projTitle: 'Practice work',
  projects: [['Self-introduction video', 'Beginner', 'A recorded 60-second introduction, improved over three attempts with feedback.'], ['GD portfolio', 'Intermediate', 'Score sheets from six group discussions showing progress over the course.'], ['Team presentation', 'Intermediate', 'A 10-minute presentation on a technical topic, delivered to the class.']],
  assess: ['A recorded self-introduction and a short writing sample.', 'Weekly speaking and writing tasks scored with a simple rubric.', 'A panel evaluation: self-introduction, group discussion and a short presentation.'],
  grading: [['Weekly tasks', 30], ['GD evaluations', 25], ['Presentation', 20], ['Final panel', 25]],
  tools: [['Phone recorder', 'Speaking practice'], ['GD rubric', 'Scored feedback'], ['Writing templates', 'Emails and reports'], ['StarkForgeX LMS', 'Tasks and progress']],
  skills: ['Introduce yourself clearly and confidently', 'Take part in and lead group discussions', 'Write clear, professional emails', 'Present a topic to a group and answer questions'],
  roles: ['Every role: communication is assessed in GD, HR and client-facing rounds'],
  companies: 'Prepares students for GD and HR rounds in campus placements, and for client-facing roles at IT services companies.',
  lab: 'A classroom with a projector and seating that can be rearranged for group work. Students use their phones for recorded practice.' },

{ id: 'interview', name: 'Interview Preparation', icon: 'brief', cat: 'career', years: [3, 4], sems: [5, 6, 7, 8], when: 'Year 3 – Year 4', hours: 60, level: 'Advanced',
  summary: 'Gets final-year students ready for every stage of a placement drive, from resume shortlisting to the HR round.',
  forWho: 'Third- and final-year students preparing for placements and internships.', prereq: 'Programming Foundations and Data Structures & Algorithms are recommended.',
  modules: [['Resume and LinkedIn', 6, ['ATS-friendly resume format', 'Writing project and skill sections', 'LinkedIn profile and headline', 'Networking basics']], ['GitHub portfolio', 6, ['Choosing projects to show', 'Writing clear READMEs', 'A clean commit history', 'Pinning and presenting work']], ['Core CS revision', 16, ['Object-oriented programming', 'DBMS and SQL', 'Operating systems', 'Computer networks']], ['Coding interviews', 14, ['Thinking aloud while solving', 'Common problem patterns', 'Writing clean code in a shared editor', 'Handling hints and follow-up questions']], ['HR interviews', 6, ['Tell me about yourself', 'Strengths, weaknesses and situational questions', 'Questions to ask the interviewer', 'Offer letters and salary basics']], ['Mock placement drive', 12, ['Online aptitude and coding test', 'Technical interview with a panel', 'HR interview', 'Individual feedback report']]],
  split: [15, 60, 25], week: ['1 strategy session', '2 practice sessions: mocks or resume clinics', 'One-on-one feedback', 'A weekly readiness review on the LMS'],
  methods: [['Resume clinics', 'Resumes are reviewed line by line until they pass ATS checks.'], ['One-on-one mocks', 'Every student faces real interview questions with written feedback.'], ['Panel interviews', 'Technical and HR panels simulate the real pressure of a drive.'], ['Readiness score', 'The LMS combines tests, mocks and resume progress into one score.']],
  projTitle: 'Practice work',
  projects: [['ATS-ready resume', 'Beginner', 'Reviewed and improved over two rounds until it scores well on ATS checks.'], ['GitHub portfolio', 'Intermediate', 'Three pinned projects with clear READMEs and demo links.'], ['Mock interview record', 'Intermediate', 'At least three recorded mock interviews, each with written feedback.']],
  assess: ['A resume review and a short mock interview set the starting readiness score.', 'The readiness score is updated every week from mocks, tests and resume progress.', 'A full mock placement drive: aptitude test, coding test, technical and HR interviews.'],
  grading: [['Resume and portfolio', 20], ['Mock interviews', 35], ['Core CS tests', 20], ['Mock placement drive', 25]],
  tools: [['ATS resume template', 'Resume'], ['LinkedIn', 'Professional profile'], ['GitHub', 'Portfolio'], ['Mock interview panel', 'Practice interviews'], ['StarkForgeX LMS', 'Readiness score']],
  skills: ['Write a resume that gets shortlisted', 'Present projects confidently in interviews', 'Answer core CS and coding questions under pressure', 'Handle HR questions with clear, honest answers'],
  roles: ['Software engineer', 'Associate engineer', 'Analyst', 'Graduate trainee'],
  companies: 'Prepares students for campus drives at service companies such as TCS, Infosys, Wipro, Cognizant, Accenture and Capgemini, and for product companies and startups.',
  lab: 'A classroom for strategy sessions, a computer lab for online tests, and two or three small rooms for one-on-one mock interviews.' },
];
const BY = Object.fromEntries(C.map((c) => [c.id, c]));
const TOTAL = C.reduce((a, c) => a + c.hours, 0);

function faq(c) {
  const lab = c.cat === 'technical';
  return [
    ['What lab setup does the college need?', c.lab],
    ['How involved are our faculty?', 'Each department names one faculty coordinator. StarkForgeX trainers deliver the sessions. The coordinator follows attendance and progress on the LMS faculty dashboard, joins the monthly review, and can co-teach selected modules if the department wishes. No extra teaching load is required.'],
    ['How does it fit into our timetable?', `The ${c.hours} hours are spread across ${c.when.replace(' · ', ', ')}. We map sessions to your academic calendar as regular timetable hours, value-added course slots or Saturday sessions, and keep clear of internal test and university exam weeks.`],
    ['What batch size do you recommend?', lab ? 'Up to 60 students per trainer for concept sessions, and up to 30 students per lab session so every student gets attention.' : 'Up to 60 students per session. Speaking practice and group discussions run in groups of 8 to 10.'],
    ['How do we track student progress?', 'Every student uses the StarkForgeX LMS. Faculty and the placement officer see attendance, test scores, course progress and students who need support, and receive a monthly report for the HOD.'],
    ['Can this count as a value-added or certificate course?', 'Yes. We provide the syllabus, attendance records, assessment results and certificates in the format colleges usually keep for value-added course records and accreditation files.'],
  ];
}

/* ---- state ---- */
const S = { year: 'all', cat: 'all', q: '' };
const catStyle = (c) => `background:var(--c-${c}-soft);color:var(--c-${c})`;
function matches(c) {
  const q = S.q.trim().toLowerCase();
  return (S.year === 'all' || c.years.includes(+S.year)) && (S.cat === 'all' || c.cat === S.cat) &&
    (!q || (c.name + ' ' + c.summary + ' ' + c.modules.map((m) => m[0] + ' ' + m[2].join(' ')).join(' ')).toLowerCase().includes(q));
}

/* ---- home ---- */
function home() {
  return `<section class="hero"><div class="wrap">
    <div><span class="label">Course catalog · 2026–27</span><h1>Nine courses, from first-year basics to placement readiness</h1>
    <p>Every course follows the same model: learn the concept, practise every day, build real projects and get assessed on the StarkForgeX LMS. Choose a course to see its full syllabus, teaching plan and assessments.</p></div>
    <div class="facts"><div><b>${C.length}</b><span>Courses</span></div><div><b>${TOTAL}</b><span>Teaching hours in total</span></div><div><b>Year 1–4</b><span>Semester-wise plan</span></div><div><b>1 LMS</b><span>Daily tests and reports</span></div></div>
  </div></section>
  <div class="wrap">
    <div class="filters">
      <div class="frow"><span class="label">Year</span>${['all', '1', '2', '3', '4'].map((y) => `<button class="chip" data-a="year" data-v="${y}" aria-pressed="${S.year === y}">${y === 'all' ? 'All years' : 'Year ' + y}</button>`).join('')}
        <label class="search">${ic('search', 16)}<input id="q" placeholder="Search topics, e.g. React or puzzles" value="${esc(S.q)}" aria-label="Search courses"></label></div>
      <div class="frow"><span class="label">Category</span>${['all', ...Object.keys(CATS)].map((k) => `<button class="chip" data-a="cat" data-v="${k}" aria-pressed="${S.cat === k}">${k === 'all' ? 'All categories' : CATS[k]}</button>`).join('')}</div>
    </div>
    <p class="count" id="count"></p>
    <div id="grid" style="margin-top:12px"></div>
  </div>
  <section class="section" id="plan"><div class="wrap">
    <div class="section-head"><div><span class="label">Four-year plan</span><h2>When each course runs</h2></div><p>A typical plan across eight semesters. We adjust it to each college’s calendar and the departments taking part.</p></div>
    <div class="gantt-wrap"><div class="gantt">
      <div class="gh yr">Course</div>${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `<div class="gh">Sem ${n}</div>`).join('')}
      ${C.map((c, ci) => `<button class="gname" data-a="open" data-v="${c.id}">${esc(c.name)}</button>${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => { const on = c.sems.includes(n); const s = on && !c.sems.includes(n - 1), e = on && !c.sems.includes(n + 1); return `<div class="gcell">${on ? `<i class="gbar ${s ? 's' : ''} ${e ? 'e' : ''}" style="background:var(--c-${c.cat})" title="${esc(c.name)}, semester ${n}"></i>` : ''}</div>`; }).join('')}`).join('')}
    </div></div>
    <div class="split-legend" style="margin-top:12px">${Object.entries(CATS).map(([k, v]) => `<span><i style="background:var(--c-${k})"></i>${v}</span>`).join('')}</div>
  </div></section>
  <section class="band"><div class="wrap"><div><h2>Plan a programme for your college</h2><p>Pick the courses and years that suit your departments. We map them to your calendar and track every student on the LMS.</p></div><a class="btn primary" href="${DEMO_LMS}">See the demo LMS ${ic('arrow', 16)}</a></div></section>`;
}
function grid() {
  const list = C.filter(matches);
  $('#count').textContent = list.length === C.length ? `Showing all ${C.length} courses` : `Showing ${list.length} of ${C.length} courses`;
  $('#grid').innerHTML = list.length ? `<div class="grid">${list.map((c) => `<button class="card" data-a="open" data-v="${c.id}">
    <div class="card-top"><span class="cic" style="${catStyle(c.cat)}">${ic(c.icon, 22)}</span><span class="cat" style="${catStyle(c.cat)}">${CATS[c.cat]}</span></div>
    <h3>${esc(c.name)}</h3><p>${esc(c.summary)}</p>
    <div class="meta"><span>${ic('cal', 15)}${esc(c.when)}</span><span>${ic('clock', 15)}${c.hours} hours</span><span>${ic('level', 15)}${esc(c.level)}</span></div>
    <span class="more">View course ${ic('arrow', 15)}</span></button>`).join('')}</div>`
    : `<div class="empty">No course matches these filters. <button class="btn ghost" data-a="reset" style="margin-left:8px">Clear filters</button></div>`;
}

/* ---- course page ---- */
const SECS = [['overview', 'Overview'], ['syllabus', 'Syllabus'], ['teaching', 'How it’s taught'], ['projects', 'Projects'], ['assessments', 'Assessments'], ['tools', 'Tools'], ['outcomes', 'Outcomes'], ['faq', 'FAQ for colleges']];
function course(c) {
  const i = C.indexOf(c), prev = C[(i - 1 + C.length) % C.length], next = C[(i + 1) % C.length];
  const secs = SECS.map(([k, l]) => [k, k === 'projects' ? (c.projTitle || 'Projects') : l]);
  const n = (k) => String(secs.findIndex((s) => s[0] === k) + 1).padStart(2, '0');
  const head = (k) => `<div class="sec-h"><span class="n">${n(k)}</span><h2>${secs.find((s) => s[0] === k)[1]}</h2></div>`;
  const total = c.grading.reduce((a, g) => a + g[1], 0);
  return `<section class="hero course-hero"><div class="wrap">
    <div class="crumb"><button data-a="home">${ic('left', 15)} All courses</button><span>/</span><span>${CATS[c.cat]}</span></div>
    <div style="display:flex;gap:14px;align-items:center"><span class="cic" style="background:#fff;color:#0B47E0">${ic(c.icon, 22)}</span><h1>${esc(c.name)}</h1></div>
    <p class="sum">${esc(c.summary)}</p>
    <div class="hchips"><span class="hchip">${ic('cal', 15)}${esc(c.when)}</span><span class="hchip">${ic('clock', 15)}${c.hours} hours</span><span class="hchip">${ic('level', 15)}${esc(c.level)}</span><span class="hchip">${ic('book', 15)}${c.modules.length} modules</span><button class="hchip" data-a="copy" style="border:0">${ic('link', 15)}Copy link</button></div>
  </div></section>
  <div class="wrap course-body">
    <nav class="toc" aria-label="Sections"><span class="label">On this page</span>${secs.map(([k, l]) => `<button data-a="jump" data-v="${k}">${l}</button>`).join('')}
      <div class="other"><span class="label">Other courses</span>${C.filter((x) => x !== c).map((x) => `<button data-a="open" data-v="${x.id}">${esc(x.name)}</button>`).join('')}</div></nav>
    <div style="min-width:0">
      <div class="mtoc">${secs.map(([k, l]) => `<button data-a="jump" data-v="${k}">${l}</button>`).join('')}</div>

      <section class="sec" id="s-overview">${head('overview')}
        <p class="lead">${esc(c.forWho)} Sessions are delivered on campus by StarkForgeX trainers, with practice, tests and progress tracking on the StarkForgeX LMS.</p>
        <div class="kv"><div><span>Category</span><b>${CATS[c.cat]}</b></div><div><span>Prerequisites</span><b>${esc(c.prereq)}</b></div><div><span>Year and semester</span><b>${esc(c.when)}</b></div><div><span>Duration</span><b>${c.hours} hours · ${c.modules.length} modules</b></div><div><span>Level</span><b>${esc(c.level)}</b></div><div><span>Delivery</span><b>On campus, with daily practice on the LMS</b></div></div>
      </section>

      <section class="sec" id="s-syllabus">${head('syllabus')}
        <p class="lead">Hours per module, out of ${c.hours} in total.</p>
        <div class="hours-strip" role="img" aria-label="Hours per module">${c.modules.map((m, j) => `<div style="flex:${m[1]};background:${MOD_COLORS[j]}" title="Module ${j + 1}: ${m[1]} hours">${j + 1}</div>`).join('')}</div>
        <div class="mods">${c.modules.map((m, j) => `<div class="mod"><span class="mn" style="background:${MOD_COLORS[j]}">${j + 1}</span><div><h3>${esc(m[0])}</h3><ul>${m[2].map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div><div class="hrs">${m[1]}<small>hours</small></div></div>`).join('')}
          <div class="mods-total"><span>Total</span><span class="num">${c.hours} hours</span></div></div>
      </section>

      <section class="sec" id="s-teaching">${head('teaching')}
        <div style="display:grid;gap:10px"><div class="split">${[['Concept', c.split[0], 'var(--brand)'], ['Hands-on', c.split[1], 'var(--ok)'], ['Assessment', c.split[2], 'var(--orange)']].map(([l, v, col]) => `<div style="flex:${v};background:${col}">${v}%</div>`).join('')}</div>
        <div class="split-legend"><span><i style="background:var(--brand)"></i>Concept sessions ${c.split[0]}%</span><span><i style="background:var(--ok)"></i>Hands-on practice ${c.split[1]}%</span><span><i style="background:var(--orange)"></i>Tests and reviews ${c.split[2]}%</span></div></div>
        <div class="methods">${c.methods.map((m, j) => `<div class="method"><span class="mi">${ic(METHOD_ICON[j], 18)}</span><div><b>${esc(m[0])}</b><span>${esc(m[1])}</span></div></div>`).join('')}</div>
        <div class="box"><h3>A typical week</h3><ul>${c.week.map((w) => `<li>${esc(w)}</li>`).join('')}</ul></div>
      </section>

      <section class="sec" id="s-projects">${head('projects')}
        <div class="projects">${c.projects.map((p) => `<div class="proj"><span class="lvl">${esc(p[1])}</span><h3>${esc(p[0])}</h3><p>${esc(p[2])}</p></div>`).join('')}</div>
      </section>

      <section class="sec" id="s-assessments">${head('assessments')}
        <div class="assess">${[['Baseline test', 'Week 1'], ['Weekly tests', 'Every week'], ['Final evaluation', 'End of course']].map(([t, w], j) => `<div class="box"><span class="label">${w}</span><h3>${t}</h3><p>${esc(c.assess[j])}</p></div>`).join('')}</div>
        <div style="overflow-x:auto"><table class="grade"><thead><tr><th>How the final grade is made up</th><th>Weight</th></tr></thead><tbody>
          ${c.grading.map((g) => `<tr><td>${esc(g[0])}<div class="gbar2"><i style="width:${g[1]}%"></i></div></td><td>${g[1]}%</td></tr>`).join('')}<tr><td>Total</td><td>${total}%</td></tr></tbody></table></div>
        <p class="note">Students who score 60% or above overall and complete all ${c.projTitle ? 'practice work' : 'projects'} receive the course certificate. Every result is visible to faculty on the LMS and included in the monthly report to the HOD.</p>
      </section>

      <section class="sec" id="s-tools">${head('tools')}
        <div class="tools">${c.tools.map((t) => `<div class="tool"><b>${esc(t[0])}</b><span>${esc(t[1])}</span></div>`).join('')}</div>
      </section>

      <section class="sec" id="s-outcomes">${head('outcomes')}
        <div><h3 style="font-size:15px;margin-bottom:10px">Skills students gain</h3><ul class="skills">${c.skills.map((s) => `<li>${ic('check', 16, 2.4)}<span>${esc(s)}</span></li>`).join('')}</ul></div>
        <div class="cert">${ic('award', 28)}<div><b>StarkForgeX Certificate in ${esc(c.name)}</b><p>Awarded to students who score 60% or above and complete all ${c.projTitle ? 'practice work' : 'projects'}. It can be co-branded with the partner college and shared on LinkedIn.</p></div></div>
        <div style="display:grid;gap:10px"><h3 style="font-size:15px">Roles it prepares students for</h3><div class="roles">${c.roles.map((r) => `<span class="role">${esc(r)}</span>`).join('')}</div><p class="lead">${esc(c.companies)}</p><p class="muted" style="font-size:12.5px">Company names show the hiring processes this course prepares for. They are not partnerships or placement guarantees.</p></div>
      </section>

      <section class="sec" id="s-faq">${head('faq')}
        <div>${faq(c).map(([q, a], j) => `<details class="faq" ${j === 0 ? 'open' : ''}><summary>${esc(q)}${ic('down', 18)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
      </section>

      <div class="pager"><button data-a="open" data-v="${prev.id}"><small>Previous course</small><b>${esc(prev.name)}</b></button><button class="next" data-a="open" data-v="${next.id}"><small>Next course</small><b>${esc(next.name)}</b></button></div>
    </div>
  </div>`;
}

/* ---- routing ---- */
function route() {
  const h = (location.hash || '').replace('#', '');
  const app = $('#app');
  if (BY[h]) { app.innerHTML = course(BY[h]); document.title = BY[h].name + ' · StarkForgeX Course Catalog'; window.scrollTo(0, 0); return; }
  app.innerHTML = home(); grid(); document.title = 'StarkForgeX Course Catalog';
  if (h === 'plan') $('#plan').scrollIntoView(); else window.scrollTo(0, 0);
}
function go(id) { if (location.hash.replace('#', '') === id) route(); else location.hash = id; }
let toastT;
function toast(m) { document.querySelectorAll('.toast').forEach((t) => t.remove()); const el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); el.textContent = m; document.body.appendChild(el); clearTimeout(toastT); toastT = setTimeout(() => el.remove(), 2600); }

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-a]'); if (!t) return;
  const a = t.dataset.a, v = t.dataset.v;
  if (a === 'open') go(v);
  else if (a === 'home') { if (location.hash) location.hash = ''; else route(); }
  else if (a === 'plan') { if (location.hash.replace('#', '') === 'plan') $('#plan')?.scrollIntoView({ behavior: 'smooth' }); else location.hash = 'plan'; }
  else if (a === 'year') { S.year = v; document.querySelectorAll('[data-a="year"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === v)); grid(); }
  else if (a === 'cat') { S.cat = v; document.querySelectorAll('[data-a="cat"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === v)); grid(); }
  else if (a === 'reset') { S.year = 'all'; S.cat = 'all'; S.q = ''; route(); }
  else if (a === 'jump') $('#s-' + v)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  else if (a === 'copy') {
    const url = location.href;
    const ok = () => toast('Link copied. Share it with your HOD or placement officer.');
    try { navigator.clipboard.writeText(url).then(ok, () => toast('Copy this page address from the browser bar to share it.')); } catch (_) { toast('Copy this page address from the browser bar to share it.'); }
  }
});
document.addEventListener('input', (e) => { if (e.target.id === 'q') { S.q = e.target.value; grid(); } });
window.addEventListener('hashchange', route);
$('#demo-link').href = DEMO_LMS;
route();
})();
