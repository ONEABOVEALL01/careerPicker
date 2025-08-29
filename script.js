// All JavaScript logic for the quiz and roadmap generation
document.addEventListener('DOMContentLoaded', () => {
    // State management
    let state = {
        currentScreen: 'home-screen',
        quizType: null, // '10th' or '12th'
        currentQuestionIndex: 0,
        scores: {},
        finalResult: '',
        userName: localStorage.getItem('userName') || '',
    };
    
    // HTML element references
    // (Removed duplicate declarations of screens and elements)

    // Quiz questions and results based on qualification
    const questions = {
        '10th': [
            { question: "Which subject do you enjoy studying the most?", options: [{ text: "Mathematics & Science", score: { Science: 1 } }, { text: "Social Studies & History", score: { Arts: 1 } }, { text: "Economics & Finance", score: { Commerce: 1 } }, { text: "Creative Arts & Literature", score: { Arts: 1 } },] },
            { question: "What kind of projects do you prefer working on?", options: [{ text: "Building models or experiments", score: { Science: 1 } }, { text: "Writing essays or stories", score: { Arts: 1 } }, { text: "Managing a budget for a school event", score: { Commerce: 1 } }, { text: "Researching historical events", score: { Arts: 1 } },] },
            { question: "When faced with a complex problem, what do you do?", options: [{ text: "Analyze data and find a logical solution", score: { Science: 1 } }, { text: "Brainstorm creative and unique ideas", score: { Arts: 1 } }, { text: "Calculate the costs and benefits of different options", score: { Commerce: 1 } }, { text: "Discuss and debate with others", score: { Arts: 1 } },] },
            { question: "Which extracurricular activity interests you?", options: [{ text: "Science or Robotics Club", score: { Science: 1 } }, { text: "Debate or Drama Club", score: { Arts: 1 } }, { text: "Chess or Investment Club", score: { Commerce: 1 } }, { text: "Creative Writing or Art Club", score: { Arts: 1 } },] },
            { question: "What kind of news headlines catch your attention?", options: [{ text: "Breakthroughs in technology or medicine", score: { Science: 1 } }, { text: "Government policy changes or global events", score: { Commerce: 1 } }, { text: "New discoveries in history or culture", score: { Arts: 1 } }, { text: "Innovations in business or finance", score: { Commerce: 1 } },] },
            { question: "You have a free afternoon. What would you do?", options: [{ text: "Work on a puzzle or a coding project", score: { Science: 1 } }, { text: "Read a classic novel or visit a museum", score: { Arts: 1 } }, { text: "Organize and track your savings", score: { Commerce: 1 } }, { text: "Listen to music or draw/paint", score: { Arts: 1 } },] },
            { question: "How do you prefer to learn?", options: [{ text: "Through hands-on experiments and labs", score: { Science: 1 } }, { text: "By reading and discussing complex texts", score: { Arts: 1 } }, { text: "By analyzing case studies and business models", score: { Commerce: 1 } }, { text: "By creating presentations or skits", score: { Arts: 1 } },] },
            { question: "What kind of movies do you enjoy the most?", options: [{ text: "Sci-Fi or documentaries about space", score: { Science: 1 } }, { text: "Historical dramas or biopics", score: { Arts: 1 } }, { text: "Financial thrillers or legal dramas", score: { Commerce: 1 } }, { text: "Artistic films or animated movies", score: { Arts: 1 } },] },
            { question: "What is your main priority for the future?", options: [{ text: "Innovation and discovery", score: { Science: 1 } }, { text: "Contributing to society and culture", score: { Arts: 1 } }, { text: "Financial stability and growth", score: { Commerce: 1 } }, { text: "Understanding people and their stories", score: { Arts: 1 } },] },
            { question: "Which of these is most appealing?", options: [{ text: "Solving equations and formulas", score: { Science: 1 } }, { text: "Debating a social issue", score: { Arts: 1 } }, { text: "Creating a business plan", score: { Commerce: 1 } }, { text: "Writing a short story", score: { Arts: 1 } },] }
        ],
        '12th': [
            { question: "When you hear 'technology', what career field sounds most interesting?", options: [{ text: "Creating and building software", score: { SoftwareEngineer: 1, WebDeveloper: 1, MobileDeveloper: 1, AIEngineer: 1 } }, { text: "Designing user experiences for products", score: { UXUIDesigner: 1, GraphicDesigner: 1 } }, { text: "Managing data and networks", score: { DataScientist: 1, NetworkAdministrator: 1, CyberSecurityAnalyst: 1 } }, { text: "Developing video games", score: { GameDeveloper: 1, Animator: 1 } }] },
            { question: "Which business role do you find most appealing?", options: [{ text: "Leading a team and making key decisions", score: { BusinessManager: 1, Entrepreneur: 1, HRManager: 1 } }, { text: "Analyzing financial data and giving advice", score: { FinancialAnalyst: 1, Accountant: 1, InvestmentBanker: 1 } }, { text: "Creating marketing campaigns and engaging customers", score: { MarketingManager: 1, DigitalMarketer: 1 } }, { text: "Handling legal matters and contracts", score: { CorporateLawyer: 1, LegalConsultant: 1 } }] },
            { question: "What kind of creative work would you like to do?", options: [{ text: "Writing stories, scripts, or articles", score: { ContentWriter: 1, Journalist: 1, Scriptwriter: 1 } }, { text: "Creating visual art, photos, or designs", score: { GraphicDesigner: 1, Photographer: 1, Architect: 1 } }, { text: "Directing or producing films", score: { Filmmaker: 1, Animator: 1 } }, { text: "Performing on stage or screen", score: { Actor: 1, Musician: 1 } }] },
            { question: "Which aspect of healthcare appeals to you?", options: [{ text: "Directly helping and caring for patients", score: { Doctor: 1, Nurse: 1, Dentist: 1, PhysicalTherapist: 1 } }, { text: "Conducting research to find new cures", score: { MedicalResearcher: 1, Biotechnologist: 1 } }, { text: "Working with data to improve public health", score: { Epidemiologist: 1, HealthDataAnalyst: 1 } }, { text: "Providing mental health support", score: { Psychologist: 1, Counselor: 1 } }] },
            { question: "What's your ideal way to help people?", options: [{ text: "Designing a safer bridge or building", score: { CivilEngineer: 1, Architect: 1 } }, { text: "Educating others and sharing knowledge", score: { Teacher: 1, Professor: 1 } }, { text: "Protecting a city or country", score: { PoliceOfficer: 1, MilitaryOfficer: 1 } }, { text: "Providing legal guidance", score: { Lawyer: 1, LegalConsultant: 1 } }] },
            { question: "Which of these is most aligned with your interests?", options: [{ text: "Solving equations and scientific puzzles", score: { SoftwareEngineer: 1, DataScientist: 1, AIEngineer: 1, Biotechnologist: 1 } }, { text: "Expressing ideas through art and writing", score: { GraphicDesigner: 1, ContentWriter: 1, Filmmaker: 1, Journalist: 1 } }, { text: "Understanding financial markets and investments", score: { FinancialAnalyst: 1, Accountant: 1, InvestmentBanker: 1 } }, { text: "Caring for people and improving their well-being", score: { Doctor: 1, Nurse: 1, Psychologist: 1, PhysicalTherapist: 1 } }] },
            { question: "Which industry are you most curious about?", options: [{ text: "Creating the next big tech gadget", score: { WebDeveloper: 1, MobileDeveloper: 1, AIEngineer: 1 } }, { text: "Managing a global brand", score: { MarketingManager: 1, BusinessManager: 1 } }, { text: "Working with patients and saving lives", score: { Doctor: 1, Nurse: 1, PhysicalTherapist: 1 } }, { text: "Exploring the world of finance", score: { FinancialAnalyst: 1, InvestmentBanker: 1 } }] },
            { question: "How do you prefer to spend your free time?", options: [{ text: "Learning a new programming language", score: { SoftwareEngineer: 1, WebDeveloper: 1, MobileDeveloper: 1 } }, { text: "Reading about business trends", score: { Entrepreneur: 1, BusinessManager: 1 } }, { text: "Sketching, drawing, or painting", score: { GraphicDesigner: 1, Architect: 1, Animator: 1 } }, { text: "Watching documentaries about the human body", score: { Doctor: 1, MedicalResearcher: 1, PhysicalTherapist: 1 } }] },
            { question: "Which of these careers requires skills you'd like to develop?", options: [{ text: "Developing a new gaming platform", score: { GameDeveloper: 1 } }, { text: "Leading a team in a corporate setting", score: { HRManager: 1 } }, { text: "Designing homes and large buildings", score: { Architect: 1 } }, { text: "Protecting a company's data from hackers", score: { CyberSecurityAnalyst: 1 } }] },
            { question: "What sounds like a rewarding day at work?", options: [{ text: "Launching a flawless new application", score: { SoftwareEngineer: 1 } }, { text: "Signing a major business deal", score: { BusinessManager: 1 } }, { text: "Getting a positive review for your artistic work", score: { ContentWriter: 1 } }, { text: "Successfully treating a patient", score: { Doctor: 1 } }] }
        ]
    };

    const resultsData = {
        '10th': {
            Science: { title: "Science Stream", description: "Your answers suggest a strong inclination towards logic, problem-solving, and a curiosity about how the world works. The Science stream is a great choice, opening doors to careers in engineering, medicine, and research.", degrees: [] },
            Arts: { title: "Arts Stream", description: "Your responses show a flair for creativity, communication, and a deep interest in human culture and history. The Arts stream will allow you to explore subjects like literature, history, and social sciences, leading to careers in media, law, and design.", degrees: [] },
            Commerce: { title: "Commerce Stream", description: "Your interests align with business, finance, and economics. You are analytical and have a knack for strategic thinking. The Commerce stream is perfect for a future in business, accounting, banking, or management.", degrees: [] },
        },
        '12th': {
            SoftwareEngineer: { title: "Software Engineer", description: "You have a knack for logical thinking and problem-solving, making you a great fit for a career in software engineering. You enjoy building things and seeing them work.", degrees: [{ name: "B.Tech/B.E. in Computer Science", desc: "A foundational engineering degree focusing on software development.", exams: ["JEE Main", "JEE Advanced", "BITSAT"] }, { name: "B.Sc. in Computer Science", desc: "A science degree with a strong theoretical and practical focus on computing.", exams: ["CUET", "NEST", "IISER Aptitude Test"] }, { name: "BCA (Bachelor of Computer Applications)", desc: "A practical degree focused on computer applications and software.", exams: ["IPU CET", "NIMCET", "SET"] }] },
            WebDeveloper: { title: "Web Developer", description: "You are interested in creating and maintaining websites and web applications. This is a great career for those who are creative and detail-oriented.", degrees: [{ name: "BCA (Bachelor of Computer Applications)", desc: "A practical degree focused on software and web development.", exams: ["IPU CET", "NIMCET", "SET"] }, { name: "B.Sc. in Web Design", desc: "A specialized degree covering the technical and creative aspects of web design.", exams: ["NIFT Entrance Exam", "UCEED"] }, { name: "B.Tech in Information Technology", desc: "An engineering degree focusing on IT infrastructure and web systems.", exams: ["JEE Main", "BITSAT"] }] },
            MobileDeveloper: { title: "Mobile App Developer", description: "You are passionate about creating applications for mobile devices. This is a fast-paced field with constant innovation.", degrees: [{ name: "B.E./B.Tech. in Computer Science", desc: "A strong foundation for both iOS and Android development.", exams: ["JEE Main", "JEE Advanced", "BITSAT"] }, { name: "B.Sc. in Mobile Computing", desc: "A specialized degree for a career in mobile application and software development.", exams: ["CUET", "university-specific exams"] }, { name: "BCA (Bachelor of Computer Applications)", desc: "A practical degree that can be a stepping stone into mobile development.", exams: ["IPU CET", "NIMCET", "SET"] }] },
            AIEngineer: { title: "AI/ML Engineer", description: "You are fascinated by artificial intelligence and machine learning. This is a cutting-edge field with immense potential for growth.", degrees: [{ name: "B.Tech/B.E. in AI & ML", desc: "A specialized engineering degree focused on artificial intelligence.", exams: ["JEE Main", "JEE Advanced", "BITSAT"] }, { name: "B.Sc. in Data Science", desc: "A science degree that provides a strong statistical foundation for AI.", exams: ["CUET", "NEST"] }, { name: "M.Sc. in AI (after B.Sc.)", desc: "A post-graduate option for deeper specialization in AI/ML.", exams: ["GATE", "CUET-PG"] }] },
            UXUIDesigner: { title: "UX/UI Designer", description: "You enjoy designing user-friendly and aesthetically pleasing products. You have a strong sense of empathy and a creative mind.", degrees: [{ name: "B.Des (Bachelor of Design)", desc: "A comprehensive degree in design, including user experience and interface.", exams: ["NIFT Entrance Exam", "NID DAT", "UCEED"] }, { name: "B.Sc. in Human-Computer Interaction", desc: "A degree focusing on the intersection of human behavior and technology.", exams: ["CUET", "university-specific exams"] }, { name: "Certificate in UX/UI Design", desc: "Short-term courses can provide a great starting point for this field.", exams: ["No specific entrance exams, portfolio based admission"] }] },
            GraphicDesigner: { title: "Graphic Designer", description: "You have a talent for visual communication and enjoy creating logos, brochures, and other visual assets. This is a career for creative and artistic individuals.", degrees: [{ name: "B.Des (Bachelor of Design)", desc: "A formal degree covering all aspects of graphic design.", exams: ["NIFT Entrance Exam", "NID DAT", "UCEED"] }, { name: "B.F.A. (Bachelor of Fine Arts)", desc: "A degree focused on fine arts with a specialization in digital or graphic design.", exams: ["CUET", "university-specific exams"] }, { name: "Diploma in Graphic Design", desc: "A shorter, more focused program to build practical skills.", exams: ["No specific entrance exams, portfolio based admission"] }] },
            DataScientist: { title: "Data Scientist", description: "You are a numbers person who loves to analyze data to uncover insights. This career is perfect for those who are curious and detail-oriented.", degrees: [{ name: "B.Sc. in Data Science or Statistics", desc: "A direct and relevant undergraduate degree.", exams: ["CUET", "NEST", "IISER Aptitude Test"] }, { name: "B.Tech in Computer Science", desc: "An engineering degree that provides a strong technical foundation.", exams: ["JEE Main", "JEE Advanced", "BITSAT"] }, { name: "M.Sc. in Data Science (after graduation)", desc: "A common path for specialization in this field.", exams: ["GATE", "CUET-PG"] }] },
            NetworkAdministrator: { title: "Network Administrator", description: "You have a strong interest in managing and maintaining computer networks. You are a problem-solver who enjoys ensuring systems run smoothly.", degrees: [{ name: "B.Tech/B.E. in Computer Science or IT", desc: "A standard engineering degree that covers networking basics.", exams: ["JEE Main", "JEE Advanced", "BITSAT"] }, { name: "B.Sc. in Networking", desc: "A specialized degree focused on network infrastructure and security.", exams: ["CUET", "university-specific exams"] }, { name: "Cisco Certified Network Associate (CCNA)", desc: "A professional certification that is highly valued in this field.", exams: ["No specific entrance exams, certification based admission"] }] },
            CyberSecurityAnalyst: { title: "Cybersecurity Analyst", description: "You are passionate about protecting systems and data from cyber threats. This is a crucial and in-demand role in today's digital world.", degrees: [{ name: "B.E./B.Tech. in Cybersecurity", desc: "A specialized engineering degree for a career in cybersecurity.", exams: ["JEE Main", "JEE Advanced", "BITSAT"] }, { name: "B.Sc. in Information Security", desc: "A technical degree focused on information security and ethical hacking.", exams: ["CUET", "university-specific exams"] }, { name: "Certified Ethical Hacker (CEH)", desc: "A professional certification that demonstrates your skills to employers.", exams: ["No specific entrance exams, certification based admission"] }] },
            GameDeveloper: { title: "Game Developer", description: "You are passionate about creating games. You enjoy combining coding, art, and storytelling to create interactive experiences.", degrees: [{ name: "B.Sc. in Game Development", desc: "A specialized degree in game design and programming.", exams: ["NIFT Entrance Exam", "UCEED"] }, { name: "B.Tech/B.E. in Computer Science", desc: "A great technical foundation for a career in game development.", exams: ["JEE Main", "JEE Advanced", "BITSAT"] }, { name: "B.Des (Bachelor of Design)", desc: "A degree focused on the artistic side of game design and concept art.", exams: ["NIFT Entrance Exam", "NID DAT", "UCEED"] }] },
            Animator: { title: "Animator", description: "You love bringing characters and objects to life through animation. This is a creative career in film, television, or video games.", degrees: [{ name: "B.F.A. in Animation", desc: "A fine arts degree focused on traditional and digital animation.", exams: ["CUET", "university-specific exams"] }, { name: "B.Des (Bachelor of Design)", desc: "A design degree with a focus on animation and visual effects.", exams: ["NIFT Entrance Exam", "NID DAT", "UCEED"] }, { name: "Diploma in Animation", desc: "A short-term course to build a portfolio and get a job quickly.", exams: ["No specific entrance exams, portfolio based admission"] }] },
            BusinessManager: { title: "Business Manager", description: "You have a flair for leadership and strategic thinking. You enjoy managing teams and making decisions to help a business grow.", degrees: [{ name: "BBA (Bachelor of Business Administration)", desc: "A foundational degree for a career in business management.", exams: ["CET", "SET", "IPMAT"] }, { name: "B.Com (Bachelor of Commerce)", desc: "A common degree for a career in business and finance.", exams: ["CUET", "university-specific exams"] }, { name: "MBA (Master of Business Administration)", desc: "A post-graduate degree for those who want to reach top management positions.", exams: ["CAT", "XAT", "GMAT"] }] },
            Entrepreneur: { title: "Entrepreneur", description: "You are a risk-taker with a desire to start your own business. You are innovative, motivated, and love a challenge.", degrees: [{ name: "BBA (Bachelor of Business Administration)", desc: "Provides a great foundation in business principles and management.", exams: ["CET", "SET", "IPMAT"] }, { name: "B.Com (Bachelor of Commerce)", desc: "Teaches you the basics of finance and accounting for your business.", exams: ["CUET", "university-specific exams"] }, { name: "Any B.Tech/B.E. or B.A.", desc: "Your degree doesn't matter as much as your passion and skills.", exams: ["No specific exams, focus on business plan"] }] },
            HRManager: { title: "HR Manager", description: "You are a people person who enjoys managing the human resources of a company. You are empathetic and a good communicator.", degrees: [{ name: "BBA (Bachelor of Business Administration)", desc: "A foundational degree for a career in human resources.", exams: ["CET", "SET", "IPMAT"] }, { name: "B.A. in Human Resources Management", desc: "A specialized degree focused on human resources and management.", exams: ["CUET", "university-specific exams"] }, { name: "MBA in Human Resources", desc: "A post-graduate degree for advanced roles in human resources.", exams: ["CAT", "XAT", "GMAT"] }] },
            FinancialAnalyst: { title: "Financial Analyst", description: "You are great with numbers and enjoy analyzing financial data. This is a career for those who are detail-oriented and analytical.", degrees: [{ name: "B.Com (Bachelor of Commerce)", desc: "A classic degree for a career in finance and accounting.", exams: ["CUET", "university-specific exams"] }, { name: "BBA (Bachelor of Business Administration)", desc: "A degree that provides a strong foundation in business and finance.", exams: ["CET", "SET", "IPMAT"] }, { name: "CFA (Chartered Financial Analyst)", desc: "A professional certification that is highly valued in the finance industry.", exams: ["CFA Exam (Level 1, 2, 3)"] }] },
            Accountant: { title: "Accountant", description: "You are a methodical and organized person who enjoys managing financial records and ensuring accuracy. This is a stable and rewarding career.", degrees: [{ name: "B.Com (Bachelor of Commerce)", desc: "The standard degree for a career in accounting and finance.", exams: ["CUET", "university-specific exams"] }, { name: "CA (Chartered Accountant)", desc: "A professional certification that is a must-have for a career in accounting.", exams: ["CA Foundation", "CA Intermediate", "CA Final"] }, { name: "CPA (Certified Public Accountant)", desc: "A professional certification that is highly valued in the accounting industry.", exams: ["CPA Exam"] }] },
            InvestmentBanker: { title: "Investment Banker", description: "You are interested in the world of high finance. This is a fast-paced and high-pressure career for those who are ambitious and strategic.", degrees: [{ name: "B.Com (Bachelor of Commerce)", desc: "A common degree for a career in investment banking.", exams: ["CUET", "university-specific exams"] }, { name: "BBA (Bachelor of Business Administration)", desc: "A degree that provides a strong foundation in business and finance.", exams: ["CET", "SET", "IPMAT"] }, { name: "MBA in Finance", desc: "A post-graduate degree that is a must-have for a career in investment banking.", exams: ["CAT", "XAT", "GMAT"] }] },
            MarketingManager: { title: "Marketing Manager", description: "You are a creative and strategic thinker who enjoys promoting products and services. You are great at understanding consumer behavior.", degrees: [{ name: "BBA (Bachelor of Business Administration)", desc: "A degree that provides a strong foundation in marketing and management.", exams: ["CET", "SET", "IPMAT"] }, { name: "B.A. in Mass Communication", desc: "A degree that focuses on communication and marketing.", exams: ["CUET", "university-specific exams"] }, { name: "MBA in Marketing", desc: "A post-graduate degree for advanced roles in marketing.", exams: ["CAT", "XAT", "GMAT"] }] },
            DigitalMarketer: { title: "Digital Marketer", description: "You are interested in online marketing and enjoy using data to create effective campaigns. This is a dynamic career in a growing field.", degrees: [{ name: "B.A. in Digital Marketing", desc: "A specialized degree that focuses on digital marketing.", exams: ["CUET", "university-specific exams"] }, { name: "BBA (Bachelor of Business Administration)", desc: "A degree that provides a strong foundation in marketing.", exams: ["CET", "SET", "IPMAT"] }, { name: "Diploma in Digital Marketing", desc: "A short-term course to build a portfolio and get a job quickly.", exams: ["No specific entrance exams, certification based admission"] }] },
            CorporateLawyer: { title: "Corporate Lawyer", description: "You have a strong sense of justice and enjoy working in the legal field. This is a career for those who are analytical and persuasive.", degrees: [{ name: "B.Com LLB", desc: "A combined degree for a career in corporate law.", exams: ["CLAT", "LSAT India", "AILET"] }, { name: "B.A. LLB", desc: "A combined degree for a career in law.", exams: ["CLAT", "LSAT India", "AILET"] }, { name: "LLB (Bachelor of Law)", desc: "The standard law degree for a career in law.", exams: ["LSAT India", "AILET"] }] },
            LegalConsultant: { title: "Legal Consultant", description: "You enjoy providing legal advice and guidance to clients. You are a great problem-solver and have strong communication skills.", degrees: [{ name: "LLB (Bachelor of Law)", desc: "The standard law degree for a career in law.", exams: ["LSAT India", "AILET"] }, { name: "B.A. in Political Science", desc: "A degree that provides a strong foundation in political science and law.", exams: ["CUET", "university-specific exams"] }, { name: "B.Com LLB", desc: "A combined degree for a career in corporate law.", exams: ["CLAT", "LSAT India", "AILET"] }] },
            ContentWriter: { title: "Content Writer", description: "You are a creative writer who loves to express ideas through words. This is a flexible career in a variety of industries.", degrees: [{ name: "B.A. in English or Journalism", desc: "A degree that provides a strong foundation in writing and communication.", exams: ["CUET", "university-specific exams"] }, { name: "B.A. in Mass Communication", desc: "A degree that focuses on communication and writing.", exams: ["CUET", "university-specific exams"] }, { name: "Diploma in Creative Writing", desc: "A short-term course to build your writing skills and portfolio.", exams: ["No specific entrance exams, portfolio based admission"] }] },
            Journalist: { title: "Journalist", description: "You are curious and have a passion for storytelling. You enjoy investigating and reporting on news and current events.", degrees: [{ name: "B.A. in Journalism", desc: "A specialized degree for a career in journalism.", exams: ["CUET", "university-specific exams"] }, { name: "B.A. in Mass Communication", desc: "A degree that focuses on communication and reporting.", exams: ["CUET", "university-specific exams"] }, { name: "B.A. in Political Science", desc: "A degree that provides a strong foundation in political science and law.", exams: ["CUET", "university-specific exams"] }] },
            Scriptwriter: { title: "Scriptwriter", description: "You are a natural storyteller who loves to write scripts for movies, TV shows, or plays. You have a vivid imagination.", degrees: [{ name: "B.A. in Screenwriting", desc: "A specialized degree for a career in screenwriting.", exams: ["university-specific exams"] }, { name: "B.A. in Creative Writing", desc: "A degree that provides a strong foundation in creative writing.", exams: ["university-specific exams"] }, { name: "B.A. in Film Studies", desc: "A degree that focuses on film history and theory.", exams: ["university-specific exams"] }] },
            Photographer: { title: "Photographer", description: "You have a creative eye and enjoy capturing moments and stories through a lens. This is a career for artistic and detail-oriented individuals.", degrees: [{ name: "B.F.A. in Photography", desc: "A fine arts degree focused on traditional and digital photography.", exams: ["CUET", "university-specific exams"] }, { name: "B.Des (Bachelor of Design)", desc: "A design degree with a focus on photography and visual arts.", exams: ["NIFT Entrance Exam", "NID DAT", "UCEED"] }, { name: "Diploma in Photography", desc: "A short-term course to build a portfolio and get a job quickly.", exams: ["No specific entrance exams, portfolio based admission"] }] },
            Architect: { title: "Architect", description: "You are both creative and technical, and you love designing buildings and spaces. You are a problem-solver who enjoys seeing a project come to life.", degrees: [{ name: "B.Arch (Bachelor of Architecture)", desc: "The standard degree for a career in architecture.", exams: ["NATA", "JEE Main Paper 2"] }, { name: "B.Des (Bachelor of Design)", desc: "A design degree with a focus on interior or urban design.", exams: ["NIFT Entrance Exam", "NID DAT", "UCEED"] }, { name: "B.E./B.Tech. in Civil Engineering", desc: "An engineering degree that provides a strong foundation for a career in architecture.", exams: ["JEE Main", "JEE Advanced"] }] },
            Filmmaker: { title: "Filmmaker", description: "You are passionate about telling stories through film. This is a creative career that involves directing, producing, and editing films.", degrees: [{ name: "B.A. in Film Studies", desc: "A degree that focuses on film history and theory.", exams: ["CUET", "university-specific exams"] }, { name: "B.A. in Mass Communication", desc: "A degree that focuses on communication and media.", exams: ["CUET", "university-specific exams"] }, { name: "B.A. in Visual Arts", desc: "A degree that provides a strong foundation in visual arts and filmmaking.", exams: ["CUET", "university-specific exams"] }] },
            Doctor: { title: "Doctor", description: "You are a compassionate person with a strong interest in medicine. You are dedicated to helping others and improving their health.", degrees: [{ name: "MBBS", desc: "The standard medical degree for a career as a doctor.", exams: ["NEET UG"] }, { name: "B.Sc. in Biology", desc: "A degree that provides a strong foundation for a career in medicine.", exams: ["CUET", "NEET UG"] }, { name: "B.Sc. in Biomedical Science", desc: "A degree that focuses on the biological and medical sciences.", exams: ["CUET", "university-specific exams"] }] },
            Nurse: { title: "Nurse", description: "You are a caring and empathetic person who enjoys helping others. This is a rewarding career in healthcare.", degrees: [{ name: "B.Sc. in Nursing", desc: "The standard degree for a career as a nurse.", exams: ["NEET UG", "AIIMS Nursing"] }, { name: "GNM (General Nursing and Midwifery)", desc: "A diploma course that provides a strong foundation for a career in nursing.", exams: ["No specific entrance exams, university-specific exams"] }, { name: "A.N.M (Auxiliary Nurse Midwifery)", desc: "A diploma course that focuses on nursing and midwifery.", exams: ["No specific entrance exams, university-specific exams"] }] },
            Dentist: { title: "Dentist", description: "You are interested in oral health and enjoy working with your hands. This is a career for those who are precise and detail-oriented.", degrees: [{ name: "BDS (Bachelor of Dental Surgery)", desc: "The standard degree for a career as a dentist.", exams: ["NEET UG"] }, { name: "B.Sc. in Dental Hygiene", desc: "A degree that focuses on dental hygiene and oral health.", exams: ["university-specific exams"] }, { name: "B.Sc. in Dental Technology", desc: "A degree that focuses on dental technology and prosthetics.", exams: ["university-specific exams"] }] },
            PhysicalTherapist: { title: "Physical Therapist", description: "You are passionate about helping people recover from injuries and improve their mobility. This is a hands-on career in healthcare.", degrees: [{ name: "BPT (Bachelor of Physical Therapy)", desc: "The standard degree for a career as a physical therapist.", exams: ["CET", "university-specific exams"] }, { name: "B.Sc. in Kinesiology", desc: "A degree that focuses on the study of human movement.", exams: ["CUET", "university-specific exams"] }, { name: "B.Sc. in Exercise Science", desc: "A degree that focuses on exercise and rehabilitation.", exams: ["CUET", "university-specific exams"] }] },
            MedicalResearcher: { title: "Medical Researcher", description: "You are a curious person who loves to solve puzzles. This career is for those who want to find cures for diseases and advance medical knowledge.", degrees: [{ name: "B.Sc. in Medical Research", desc: "A specialized degree for a career in medical research.", exams: ["CUET", "university-specific exams"] }, { name: "B.Sc. in Biomedical Science", desc: "A degree that focuses on the biological and medical sciences.", exams: ["CUET", "university-specific exams"] }, { name: "MBBS", desc: "A medical degree that provides a strong foundation for a career in medical research.", exams: ["NEET UG"] }] },
            Biotechnologist: { title: "Biotechnologist", description: "You are fascinated by the intersection of biology and technology. This is a cutting-edge career in science and medicine.", degrees: [{ name: "B.Sc. in Biotechnology", desc: "A specialized degree for a career in biotechnology.", exams: ["CUET", "university-specific exams"] }, { name: "B.Tech/B.E. in Biotechnology", desc: "A specialized engineering degree for a career in biotechnology.", exams: ["JEE Main", "BITSAT"] }, { name: "M.Sc. in Biotechnology", desc: "A post-graduate degree for advanced roles in biotechnology.", exams: ["GATE", "CUET-PG"] }] },
            Epidemiologist: { title: "Epidemiologist", description: "You are a data-driven person who wants to understand and prevent the spread of diseases. This is a career for those who are analytical and passionate about public health.", degrees: [{ name: "B.Sc. in Epidemiology", desc: "A specialized degree for a career in epidemiology.", exams: ["CUET", "university-specific exams"] }, { name: "B.Sc. in Public Health", desc: "A degree that focuses on public health and disease prevention.", exams: ["CUET", "university-specific exams"] }, { name: "M.P.H. (Master of Public Health)", desc: "A post-graduate degree for advanced roles in public health.", exams: ["university-specific exams"] }] },
            HealthDataAnalyst: { title: "Health Data Analyst", description: "You are a great with numbers and enjoy analyzing health data to improve patient care and outcomes. This is a growing field in healthcare.", degrees: [{ name: "B.Sc. in Health Informatics", desc: "A specialized degree for a career in health data analysis.", exams: ["CUET", "university-specific exams"] }, { name: "B.Sc. in Data Science", desc: "A degree that provides a strong statistical foundation for data analysis.", exams: ["CUET", "NEST"] }, { name: "M.P.H. (Master of Public Health)", desc: "A post-graduate degree for advanced roles in public health.", exams: ["university-specific exams"] }] },
            Psychologist: { title: "Psychologist", description: "You are an empathetic person who wants to help others with their mental health. This is a rewarding career for those who are good listeners and problem-solvers.", degrees: [{ name: "B.A. in Psychology", desc: "A standard degree for a career in psychology.", exams: ["CUET", "university-specific exams"] }, { name: "M.A. in Psychology", desc: "A post-graduate degree for advanced roles in psychology.", exams: ["CUET-PG", "university-specific exams"] }, { name: "Ph.D. in Psychology", desc: "A doctoral degree for a career in research or academia.", exams: ["NET", "university-specific exams"] }] },
            Counselor: { title: "Counselor", description: "You are a compassionate person who enjoys helping people navigate life's challenges. This is a career for those who are patient and supportive.", degrees: [{ name: "B.A. in Counseling", desc: "A specialized degree for a career in counseling.", exams: ["CUET", "university-specific exams"] }, { name: "B.A. in Social Work", desc: "A degree that focuses on social work and counseling.", exams: ["CUET", "university-specific exams"] }, { name: "M.A. in Counseling", desc: "A post-graduate degree for advanced roles in counseling.", exams: ["CUET-PG", "university-specific exams"] }] },
            CivilEngineer: { title: "Civil Engineer", description: "You are a problem-solver who enjoys designing and building infrastructure like roads, bridges, and buildings. This is a rewarding career that makes a real impact.", degrees: [{ name: "B.E./B.Tech. in Civil Engineering", desc: "The standard engineering degree for a career in civil engineering.", exams: ["JEE Main", "JEE Advanced"] }, { name: "B.Arch (Bachelor of Architecture)", desc: "A degree that provides a strong foundation for a career in civil engineering.", exams: ["NATA", "JEE Main Paper 2"] }, { name: "M.S. in Civil Engineering", desc: "A post-graduate degree for advanced roles in civil engineering.", exams: ["GATE", "university-specific exams"] }] },
            Teacher: { title: "Teacher", description: "You are passionate about education and enjoy sharing your knowledge with others. This is a rewarding career that helps shape the future.", degrees: [{ name: "B.Ed (Bachelor of Education)", desc: "The standard degree for a career as a teacher.", exams: ["CTET", "TET"] }, { name: "B.A. or B.Sc. in a subject of your choice", desc: "A degree that provides a strong foundation in a specific subject.", exams: ["CUET", "university-specific exams"] }, { name: "M.Ed (Master of Education)", desc: "A post-graduate degree for advanced roles in education.", exams: ["CUET-PG", "university-specific exams"] }] },
            PoliceOfficer: { title: "Police Officer", description: "You are a person who wants to serve your community and protect others. This is a challenging and rewarding career for those who are brave and dedicated.", degrees: [{ name: "B.A. in Criminology", desc: "A degree that provides a strong foundation in criminology and law enforcement.", exams: ["CUET", "university-specific exams"] }, { name: "B.A. in Public Administration", desc: "A degree that focuses on public administration and law enforcement.", exams: ["CUET", "university-specific exams"] }, { name: "B.A. in Sociology", desc: "A degree that focuses on social issues and law enforcement.", exams: ["CUET", "university-specific exams"] }] },
            MilitaryOfficer: { title: "Military Officer", description: "You are a disciplined and patriotic person who wants to serve your country. This is a demanding career that offers great leadership opportunities.", degrees: [{ name: "B.A. in Military Science", desc: "A specialized degree for a career in the military.", exams: ["NDA", "CDS"] }, { name: "B.A. in Political Science", desc: "A degree that provides a strong foundation in political science and military history.", exams: ["CUET", "university-specific exams"] }, { name: "B.E./B.Tech. in any discipline", desc: "An engineering degree that is highly valued in the military.", exams: ["JEE Main", "BITSAT", "NDA", "CDS"] }] },
            Lawyer: { title: "Lawyer", description: "You have a strong sense of justice and enjoy debating and persuading others. This is a challenging career that offers great opportunities to help others.", degrees: [{ name: "LLB (Bachelor of Law)", desc: "The standard law degree for a career as a lawyer.", exams: ["LSAT India", "AILET"] }, { name: "B.A. in Political Science", desc: "A degree that provides a strong foundation in political science and law.", exams: ["CUET", "university-specific exams"] }, { name: "B.Com LLB", desc: "A combined degree for a career in corporate law.", exams: ["CLAT", "LSAT India", "AILET"] }] },
        }
    };

    // HTML element references
    const screens = {
        home: document.getElementById('home-screen'),
        welcome1: document.getElementById('welcome-screen-1'),
        quizIntro: document.getElementById('quiz-intro-screen'),
        quiz: document.getElementById('quiz-screen'),
        results: document.getElementById('results-screen'),
        roadmapModal: document.getElementById('roadmap-modal'),
    };

    const elements = {
        nameInput: document.getElementById('name-input'),
        startJourneyBtn: document.getElementById('start-journey-btn'),
        userDisplayName: document.getElementById('user-display-name'),
        button10th: document.getElementById('button-10th'),
        button12th: document.getElementById('button-12th'),
        startQuizBtn: document.getElementById('start-quiz-btn'),
        questionText: document.getElementById('question-text'),
        optionsContainer: document.getElementById('options-container'),
        progressText: document.getElementById('progress-text'),
        resultTitle: document.getElementById('result-title'),
        resultDescription: document.getElementById('result-description'),
        restartQuizBtn: document.getElementById('restart-quiz-btn'),
        roadMapBtn: document.getElementById('roadMap-btn'),
        roadmapContent: document.getElementById('roadmap-content'),
        roadmapImage: document.getElementById('roadmap-image'),
        downloadPdfBtn: document.getElementById('download-pdf-btn'),
        closeModalBtn: document.getElementById('close-modal-btn'),
        roadmapLoadingState: document.getElementById('roadmap-loading-state'),
        roadmapTextContainer: document.getElementById('roadmap-text-container'),
        chatbotToggleBtn: document.getElementById('chatbot-toggle-btn'),
        chatbotBubble: document.getElementById('chatbot-bubble'),
        closeChatBtn: document.getElementById('close-chat-btn'),
        chatMessages: document.getElementById('chat-messages'),
        chatInputContainer: document.getElementById('chat-input-container'),
        chatInput: document.getElementById('chat-input'),
        chatSendBtn: document.getElementById('chat-send-btn'),
        degreesContainer: document.getElementById('degrees-container'),
        degreesList: document.getElementById('degrees-list'),
        darkModeToggle: document.getElementById('dark-mode-toggle'),
        progressBarContainer: document.getElementById('progress-bar-container'),
        progressBar: document.getElementById('progress-bar'),
    };

    // Helper function to show a screen
    const showScreen = (screenId) => {
        Object.values(screens).forEach(screen => {
            screen.classList.add('hidden');
        });
        screens[screenId].classList.remove('hidden');
    };

    // Function to restart the quiz
    const restartQuiz = () => {
        state.currentQuestionIndex = 0;
        state.scores = {};
        elements.progressBarContainer.classList.add('hidden');
        elements.progressBar.style.width = '0%';
        showScreen('welcome1');
    };

    // Function to render the current question
    const renderQuestion = () => {
        const currentQuizQuestions = questions[state.quizType];
        if (state.currentQuestionIndex < currentQuizQuestions.length) {
            const currentQuestion = currentQuizQuestions[state.currentQuestionIndex];
            elements.questionText.textContent = currentQuestion.question;
            elements.optionsContainer.innerHTML = '';
            elements.progressText.textContent = `Question ${state.currentQuestionIndex + 1} of ${currentQuizQuestions.length}`;
            
            const progressPercentage = ((state.currentQuestionIndex + 1) / currentQuizQuestions.length) * 100;
            elements.progressBar.style.width = `${progressPercentage}%`;

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option.text;
                button.classList.add('w-full', 'px-6', 'py-4', 'bg-white', 'text-gray-600', 'font-semibold', 'rounded-full', 'border', 'border-gray-300', 'shadow-md', 'hover:bg-blue-50', 'transition-all', 'transform', 'hover:scale-105', 'hover:text-[rgba(77,68,255,0.862)]', 'active:scale-95', 'active:bg-blue-100', 'focus:outline-none', 'focus:ring-2', 'focus:ring-[rgba(77,68,255,0.862)]', 'focus:ring-opacity-50');
                
                // Add mobile-specific click effects
                button.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                    this.style.backgroundColor = '#dbeafe';
                });
                
                button.addEventListener('touchend', function() {
                    setTimeout(() => {
                        this.style.transform = '';
                        this.style.backgroundColor = '';
                    }, 150);
                });
                
                button.onclick = () => selectAnswer(option);
                elements.optionsContainer.appendChild(button);
            });
        } else {
            showResults();
        }
    };

    // Function to handle answer selection
    const selectAnswer = (option) => {
        // Update scores
        for (const key in option.score) {
            state.scores[key] = (state.scores[key] || 0) + option.score[key];
        }
        // Move to next question
        state.currentQuestionIndex++;
        renderQuestion();
    };

    // Function to display quiz results
    const showResults = () => {
        elements.progressBarContainer.classList.add('hidden');
        let maxScore = 0;
        let resultKey = '';
        for (const key in state.scores) {
            if (state.scores[key] > maxScore) {
                maxScore = state.scores[key];
                resultKey = key;
            }
        }
        
        state.finalResult = resultsData[state.quizType][resultKey].title;
        elements.resultTitle.textContent = state.finalResult;
        elements.resultDescription.textContent = resultsData[state.quizType][resultKey].description;
        
        // Show degrees for 12th grade
        if (state.quizType === '12th') {
            elements.degreesContainer.classList.remove('hidden');
            elements.degreesList.innerHTML = '';
            const degrees = resultsData[state.quizType][resultKey].degrees;
            if (degrees && degrees.length > 0) {
                degrees.forEach(degree => {
                    const examsListHtml = degree.exams && degree.exams.length > 0 ?
                        degree.exams.map(exam => `<li class="ml-4 text-sky-400">${exam}</li>`).join('') :
                        '<li class="ml-4">No specific exams listed.</li>';

                    const degreeItem = document.createElement('div');
                    degreeItem.classList.add('p-4', 'bg-gray-100', 'rounded-xl', 'shadow-sm', 'transition-colors', 'dark:bg-gray-700');
                    degreeItem.innerHTML = `
                        <h5 class="text-lg font-bold text-white dark:text-white">${degree.name}</h5>
                        <p class="text-sm text-gray-600 font-normal dark:text-gray-400 mt-2">${degree.desc}</p>
                        <h6 class="text-md font-bold mt-4 text-white dark:text-white">Relevant Entrance Exams:</h6>
                        <ul class="list-disc list-inside mt-2 space-y-1">
                            ${examsListHtml}
                        </ul>
                    `;
                    elements.degreesList.appendChild(degreeItem);
                });
            } else {
                 elements.degreesContainer.classList.add('hidden');
            }
        } else {
            elements.degreesContainer.classList.add('hidden');
        }
        
        showScreen('results');
    };

    // Function to generate and display the roadmap
    const generateRoadmap = async () => {
        elements.roadmapContent.innerHTML = ''; // Reset content
        elements.roadmapLoadingState.classList.remove('hidden');
        screens.roadmapModal.classList.remove('hidden');
        
        try {
            // Generate roadmap content based on the career result
            const roadmapContent = generateRoadmapContent(state.finalResult);
            elements.roadmapContent.innerHTML = roadmapContent;
            
        } catch (error) {
            console.error("Roadmap generation failed:", error);
            elements.roadmapContent.innerHTML = `
                <div class="text-center text-gray-700 dark:text-gray-300 p-6">
                    <h3 class="text-xl font-bold mb-4">Your Career Roadmap</h3>
                    <p>An error occurred while generating the roadmap. Here's a basic roadmap for your career path.</p>
                    <div class="mt-6 text-left">
                        ${generateBasicRoadmap(state.finalResult)}
                    </div>
                </div>
            `;
        } finally {
            elements.roadmapLoadingState.classList.add('hidden');
        }
    };

    // Function to generate roadmap content
    const generateRoadmapContent = (careerPath) => {
        const roadmapData = getRoadmapData(careerPath);
        
        return `
            <div class="pdf-container bg-white p-6 rounded-xl shadow-lg">
                <h2 class="text-3xl font-bold mb-6 text-center text-gray-900">Your Career Roadmap: ${careerPath}</h2>
                
                <div class="space-y-6">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h3 class="text-xl font-bold mb-3 text-blue-800">🎯 Career Overview</h3>
                        <p class="text-gray-700">${roadmapData.overview}</p>
                    </div>
                    
                    ${roadmapData.detailedTimeline ? `
                    <div class="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                        <h3 class="text-xl font-bold mb-4 text-gray-800">📅 Detailed Timeline</h3>
                        <div class="space-y-4">
                            ${Object.entries(roadmapData.detailedTimeline).map(([year, yearData]) => `
                                <div class="border-l-4 border-green-500 pl-4">
                                    <h4 class="text-lg font-bold text-gray-800 mb-3">${year}</h4>
                                    ${typeof yearData === 'object' && !Array.isArray(yearData) ? 
                                        Object.entries(yearData).map(([month, monthData]) => `
                                            <div class="ml-4 mb-3">
                                                <h5 class="font-semibold text-gray-700 mb-2">${month}</h5>
                                                ${typeof monthData === 'object' && !Array.isArray(monthData) ?
                                                    Object.entries(monthData).map(([week, weekTasks]) => `
                                                        <div class="ml-4 mb-2">
                                                            <h6 class="font-medium text-gray-600 mb-1">${week}</h6>
                                                            <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                                                                ${Array.isArray(weekTasks) ? weekTasks.map(task => `<li>${task}</li>`).join('') : `<li>${monthData}</li>`}
                                                            </ul>
                                                        </div>
                                                    `).join('') :
                                                    `<ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                                                        ${Array.isArray(monthData) ? monthData.map(task => `<li>${task}</li>`).join('') : `<li>${monthData}</li>`}
                                                    </ul>`
                                                }
                                            </div>
                                        `).join('') :
                                        `<ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                                            ${Array.isArray(yearData) ? yearData.map(task => `<li>${task}</li>`).join('') : `<li>${yearData}</li>`}
                                        </ul>`
                                    }
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h3 class="text-xl font-bold mb-3 text-green-800">📚 Educational Path</h3>
                        <ul class="list-disc list-inside space-y-2 text-gray-700">
                            ${roadmapData.education.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="bg-yellow-50 p-4 rounded-lg">
                        <h3 class="text-xl font-bold mb-3 text-yellow-800">🛠️ Key Skills to Develop</h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-2">Technical Skills:</h4>
                                <ul class="list-disc list-inside space-y-1 text-gray-700">
                                    ${roadmapData.technicalSkills.map(skill => `<li>${skill}</li>`).join('')}
                                </ul>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-2">Soft Skills:</h4>
                                <ul class="list-disc list-inside space-y-1 text-gray-700">
                                    ${roadmapData.softSkills.map(skill => `<li>${skill}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <h3 class="text-xl font-bold mb-3 text-purple-800">💼 Practical Experience</h3>
                        <ul class="list-disc list-inside space-y-2 text-gray-700">
                            ${roadmapData.experience.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h3 class="text-xl font-bold mb-3 text-[rgba(77,68,255,0.862)]">🚀 Career Progression</h3>
                        <div class="space-y-3">
                            ${roadmapData.progression.map((stage, index) => `
                                <div class="flex items-start space-x-3">
                                    <div class="bg-[rgba(77,68,255,0.862)] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">${index + 1}</div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800">${stage.title}</h4>
                                        <p class="text-gray-700 text-sm">${stage.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="text-xl font-bold mb-3 text-gray-800">📈 Future Outlook</h3>
                        <p class="text-gray-700">${roadmapData.futureOutlook}</p>
                    </div>
                </div>
            </div>
        `;
    };

    // Function to get roadmap data for different career paths
    const getRoadmapData = (careerPath) => {
        const roadmapData = {
            'Software Engineer': {
                overview: 'Software engineering is a dynamic field focused on designing, developing, and maintaining software applications. It offers excellent career growth and competitive salaries.',
                detailedTimeline: {
                    'Year 1': {
                        'Months 1-3': {
                            'Week 1-2': ['Research programming languages (Python, JavaScript)', 'Set up development environment', 'Complete online coding tutorials'],
                            'Week 3-4': ['Learn basic HTML, CSS, and JavaScript', 'Build simple static websites', 'Join coding communities and forums'],
                            'Week 5-8': ['Study data structures and algorithms', 'Practice coding problems on platforms like LeetCode', 'Start learning a backend language (Java/Python)'],
                            'Week 9-12': ['Learn version control with Git', 'Contribute to open source projects', 'Build a portfolio website']
                        },
                        'Months 4-6': {
                            'Week 13-16': ['Learn database concepts (SQL)', 'Build full-stack applications', 'Study software development methodologies'],
                            'Week 17-20': ['Learn about APIs and web services', 'Practice building RESTful APIs', 'Study system design basics'],
                            'Week 21-24': ['Learn about cloud platforms (AWS/Azure)', 'Deploy applications to cloud', 'Study DevOps practices']
                        },
                        'Months 7-9': {
                            'Week 25-28': ['Learn about testing and quality assurance', 'Practice writing unit tests', 'Study software architecture patterns'],
                            'Week 29-32': ['Learn about security best practices', 'Study authentication and authorization', 'Practice secure coding'],
                            'Week 33-36': ['Build complex projects for portfolio', 'Participate in hackathons', 'Network with professionals in the field']
                        },
                        'Months 10-12': {
                            'Week 37-40': ['Prepare for technical interviews', 'Practice coding interviews', 'Update resume and portfolio'],
                            'Week 41-44': ['Apply for internships and entry-level positions', 'Attend career fairs and networking events', 'Study company-specific technologies'],
                            'Week 45-48': ['Complete internship applications', 'Prepare for technical assessments', 'Build final portfolio projects']
                        }
                    },
                    'Year 2': {
                        'Months 1-3': ['Secure internship or entry-level position', 'Learn company-specific technologies', 'Contribute to team projects'],
                        'Months 4-6': ['Take ownership of small features', 'Learn about code review processes', 'Study advanced programming concepts'],
                        'Months 7-9': ['Mentor junior developers', 'Learn about project management', 'Study system design in depth'],
                        'Months 10-12': ['Lead small projects', 'Learn about microservices architecture', 'Study cloud-native development']
                    },
                    'Year 3': {
                        'Months 1-6': ['Specialize in specific technologies', 'Lead medium-sized projects', 'Mentor multiple junior developers'],
                        'Months 7-12': ['Architect solutions for complex problems', 'Contribute to technical strategy', 'Study leadership and management']
                    }
                },
                education: [
                    'Complete 12th with Mathematics and Physics',
                    'Pursue B.Tech/B.E. in Computer Science or related field',
                    'Consider M.Tech for specialization in areas like AI, ML, or Cybersecurity',
                    'Obtain relevant certifications (AWS, Azure, Google Cloud)'
                ],
                technicalSkills: [
                    'Programming languages (Java, Python, JavaScript)',
                    'Data structures and algorithms',
                    'Database management systems',
                    'Version control (Git)',
                    'Cloud computing platforms'
                ],
                softSkills: [
                    'Problem-solving and analytical thinking',
                    'Team collaboration and communication',
                    'Time management and project planning',
                    'Continuous learning and adaptability',
                    'Attention to detail'
                ],
                experience: [
                    'Build personal projects and contribute to open source',
                    'Complete internships at tech companies',
                    'Participate in coding competitions and hackathons',
                    'Join coding clubs and technical communities',
                    'Create a strong portfolio showcasing your work'
                ],
                progression: [
                    { title: 'Junior Developer (0-2 years)', description: 'Focus on learning technologies and contributing to team projects' },
                    { title: 'Mid-level Developer (2-5 years)', description: 'Take ownership of features and mentor junior developers' },
                    { title: 'Senior Developer (5-8 years)', description: 'Lead technical decisions and architecture design' },
                    { title: 'Tech Lead/Architect (8+ years)', description: 'Drive technical strategy and mentor teams' }
                ],
                futureOutlook: 'The software engineering field is expected to grow significantly with the rise of AI, cloud computing, and digital transformation. Remote work opportunities and competitive salaries make it an attractive career choice.'
            },
            'Doctor': {
                overview: 'Medicine is a noble profession dedicated to healing and helping others. It requires extensive education but offers immense job satisfaction and respect.',
                detailedTimeline: {
                    'Year 1 (Pre-Medical)': {
                        'Months 1-3': {
                            'Week 1-4': ['Focus on Biology, Chemistry, and Physics', 'Join NEET coaching classes', 'Start regular study schedule'],
                            'Week 5-8': ['Practice NEET mock tests', 'Study NCERT textbooks thoroughly', 'Join study groups'],
                            'Week 9-12': ['Take full-length practice tests', 'Focus on weak areas', 'Prepare for NEET exam']
                        },
                        'Months 4-6': ['Clear NEET UG exam', 'Apply for MBBS colleges', 'Prepare for medical school'],
                        'Months 7-9': ['Complete admission formalities', 'Attend orientation programs', 'Start MBBS program'],
                        'Months 10-12': ['Complete first semester of MBBS', 'Study anatomy and physiology', 'Participate in practical sessions']
                    },
                    'Year 2-3 (MBBS Foundation)': {
                        'Months 1-6': ['Study basic medical sciences', 'Complete anatomy and physiology', 'Learn clinical skills'],
                        'Months 7-12': ['Study pathology and pharmacology', 'Begin clinical rotations', 'Learn patient interaction skills']
                    },
                    'Year 4-5 (Clinical Years)': {
                        'Months 1-12': ['Complete clinical rotations', 'Study medicine, surgery, pediatrics', 'Prepare for final MBBS exams'],
                        'Months 13-18': ['Complete MBBS degree', 'Start internship program', 'Gain hands-on clinical experience']
                    },
                    'Year 6 (Internship)': {
                        'Months 1-6': ['Complete mandatory internship', 'Work in various departments', 'Prepare for PG entrance exams'],
                        'Months 7-12': ['Apply for PG courses', 'Take NEET PG exam', 'Choose specialization']
                    }
                },
                education: [
                    'Complete 12th with Biology, Chemistry, and Physics',
                    'Clear NEET UG for MBBS admission',
                    'Complete 5.5 years of MBBS program',
                    'Complete 1 year of internship',
                    'Pursue specialization through PG courses (MD/MS)'
                ],
                technicalSkills: [
                    'Medical diagnosis and treatment',
                    'Patient care and management',
                    'Medical procedures and surgeries',
                    'Use of medical equipment',
                    'Medical research and analysis'
                ],
                softSkills: [
                    'Empathy and patient communication',
                    'Critical thinking and decision making',
                    'Stress management and emotional resilience',
                    'Leadership and teamwork',
                    'Ethical judgment and integrity'
                ],
                experience: [
                    'Complete mandatory internship during MBBS',
                    'Participate in medical camps and community service',
                    'Join medical associations and attend conferences',
                    'Publish research papers and case studies',
                    'Gain experience in different medical specialties'
                ],
                progression: [
                    { title: 'Medical Student (5.5 years)', description: 'Complete MBBS with theoretical and practical training' },
                    { title: 'Intern (1 year)', description: 'Gain hands-on experience in various departments' },
                    { title: 'Resident Doctor (3-5 years)', description: 'Specialize in chosen field through PG program' },
                    { title: 'Consultant/Specialist (5+ years)', description: 'Practice independently and mentor junior doctors' }
                ],
                futureOutlook: 'Healthcare is a growing sector with increasing demand for qualified doctors. Specializations in emerging fields like telemedicine, AI in healthcare, and preventive medicine offer new opportunities.'
            },
            'Business Manager': {
                overview: 'Business management involves leading organizations, making strategic decisions, and driving growth. It\'s a versatile career with opportunities across industries.',
                detailedTimeline: {
                    'Year 1 (Foundation)': {
                        'Months 1-3': {
                            'Week 1-4': ['Research business programs and colleges', 'Prepare for entrance exams', 'Build basic business knowledge'],
                            'Week 5-8': ['Apply for BBA/B.Com programs', 'Study business fundamentals', 'Join business clubs and organizations'],
                            'Week 9-12': ['Start BBA/B.Com program', 'Study accounting and economics', 'Participate in business competitions']
                        },
                        'Months 4-6': ['Study marketing and management principles', 'Learn about business operations', 'Join student business organizations'],
                        'Months 7-9': ['Study finance and business law', 'Participate in case study competitions', 'Build professional network'],
                        'Months 10-12': ['Complete first year of business program', 'Apply for summer internships', 'Study strategic management']
                    },
                    'Year 2 (Specialization)': {
                        'Months 1-6': ['Choose business specialization', 'Study advanced business concepts', 'Complete summer internship'],
                        'Months 7-12': ['Study international business', 'Learn about digital transformation', 'Prepare for final year projects']
                    },
                    'Year 3 (Advanced)': {
                        'Months 1-6': ['Complete capstone projects', 'Study leadership and ethics', 'Apply for MBA programs'],
                        'Months 7-12': ['Graduate with business degree', 'Start entry-level business role', 'Prepare for MBA entrance exams']
                    }
                },
                education: [
                    'Complete 12th in any stream',
                    'Pursue BBA or B.Com for business foundation',
                    'Consider MBA for advanced management roles',
                    'Obtain industry-specific certifications',
                    'Attend leadership development programs'
                ],
                technicalSkills: [
                    'Strategic planning and analysis',
                    'Financial management and budgeting',
                    'Project management methodologies',
                    'Data analysis and business intelligence',
                    'Digital marketing and e-commerce'
                ],
                softSkills: [
                    'Leadership and team management',
                    'Communication and negotiation',
                    'Problem-solving and decision making',
                    'Adaptability and change management',
                    'Networking and relationship building'
                ],
                experience: [
                    'Start with entry-level business roles',
                    'Take on project management responsibilities',
                    'Participate in business competitions and case studies',
                    'Join professional business associations',
                    'Build a network of industry contacts'
                ],
                progression: [
                    { title: 'Business Analyst (0-2 years)', description: 'Analyze business processes and recommend improvements' },
                    { title: 'Team Lead (2-4 years)', description: 'Manage small teams and oversee projects' },
                    { title: 'Manager (4-7 years)', description: 'Lead departments and implement strategies' },
                    { title: 'Senior Manager/Director (7+ years)', description: 'Drive organizational growth and mentor leaders' }
                ],
                futureOutlook: 'Business management roles are evolving with digital transformation. Skills in data analytics, digital marketing, and sustainable business practices are becoming increasingly important.'
            },
            'Data Scientist': {
                overview: 'Data science combines statistics, programming, and domain expertise to extract insights from data. It\'s a high-demand field with excellent career prospects.',
                detailedTimeline: {
                    'Year 1 (Foundation)': {
                        'Months 1-3': {
                            'Week 1-4': ['Learn Python programming basics', 'Study mathematics and statistics', 'Set up data science environment'],
                            'Week 5-8': ['Learn data manipulation with Pandas', 'Study probability and statistics', 'Practice with real datasets'],
                            'Week 9-12': ['Learn data visualization with Matplotlib/Seaborn', 'Study SQL for data querying', 'Complete first data analysis project']
                        },
                        'Months 4-6': ['Learn machine learning basics', 'Study linear algebra and calculus', 'Practice with Kaggle datasets'],
                        'Months 7-9': ['Learn advanced ML algorithms', 'Study deep learning fundamentals', 'Build predictive models'],
                        'Months 10-12': ['Learn big data technologies', 'Study data engineering concepts', 'Complete comprehensive data science project']
                    },
                    'Year 2 (Specialization)': {
                        'Months 1-6': ['Specialize in specific domains (NLP, Computer Vision)', 'Learn advanced statistical methods', 'Complete internships'],
                        'Months 7-12': ['Study MLOps and deployment', 'Learn cloud platforms for ML', 'Build production-ready models']
                    },
                    'Year 3 (Advanced)': {
                        'Months 1-6': ['Lead data science projects', 'Mentor junior data scientists', 'Contribute to research papers'],
                        'Months 7-12': ['Architect data science solutions', 'Drive data strategy', 'Lead data science teams']
                    }
                },
                education: [
                    'Complete 12th with Mathematics and Statistics',
                    'Pursue B.Sc. in Data Science or Statistics',
                    'Consider M.Sc. in Data Science or related field',
                    'Obtain certifications in Python, R, and SQL',
                    'Learn machine learning and AI concepts'
                ],
                technicalSkills: [
                    'Programming languages (Python, R, SQL)',
                    'Statistical analysis and modeling',
                    'Machine learning algorithms',
                    'Data visualization tools',
                    'Big data technologies (Hadoop, Spark)'
                ],
                softSkills: [
                    'Analytical thinking and problem-solving',
                    'Communication of complex findings',
                    'Curiosity and continuous learning',
                    'Attention to detail and accuracy',
                    'Collaboration with cross-functional teams'
                ],
                experience: [
                    'Work on personal data analysis projects',
                    'Participate in Kaggle competitions',
                    'Complete internships at data-driven companies',
                    'Contribute to open-source data science projects',
                    'Build a portfolio showcasing your analyses'
                ],
                progression: [
                    { title: 'Data Analyst (0-2 years)', description: 'Focus on data cleaning, analysis, and basic modeling' },
                    { title: 'Junior Data Scientist (2-4 years)', description: 'Develop machine learning models and advanced analytics' },
                    { title: 'Senior Data Scientist (4-7 years)', description: 'Lead complex projects and mentor junior team members' },
                    { title: 'Lead Data Scientist (7+ years)', description: 'Drive data strategy and innovation initiatives' }
                ],
                futureOutlook: 'Data science is rapidly growing with the increasing importance of data-driven decision making. AI and machine learning are creating new opportunities in this field.'
            },
            'Graphic Designer': {
                overview: 'Graphic design combines creativity with technical skills to create visual communications. It\'s a versatile career with opportunities in various industries.',
                detailedTimeline: {
                    'Year 1 (Foundation)': {
                        'Months 1-3': {
                            'Week 1-4': ['Learn design principles and theory', 'Study color theory and typography', 'Practice sketching and drawing'],
                            'Week 5-8': ['Learn Adobe Photoshop basics', 'Study layout and composition', 'Create simple design projects'],
                            'Week 9-12': ['Learn Adobe Illustrator', 'Study branding and logo design', 'Build initial portfolio pieces']
                        },
                        'Months 4-6': ['Learn Adobe InDesign', 'Study print design principles', 'Create print materials (brochures, posters)'],
                        'Months 7-9': ['Learn digital design principles', 'Study web design basics', 'Create digital assets and graphics'],
                        'Months 10-12': ['Learn about design trends', 'Study user experience principles', 'Complete comprehensive design project']
                    },
                    'Year 2 (Specialization)': {
                        'Months 1-6': ['Specialize in specific design areas', 'Learn advanced software techniques', 'Build professional portfolio'],
                        'Months 7-12': ['Learn about design business', 'Study client communication', 'Start freelance work']
                    },
                    'Year 3 (Professional)': {
                        'Months 1-6': ['Work on real client projects', 'Build strong portfolio', 'Network with design professionals'],
                        'Months 7-12': ['Establish design business', 'Mentor junior designers', 'Lead design projects']
                    }
                },
                education: [
                    'Complete 12th in any stream',
                    'Pursue B.Des in Graphic Design or BFA',
                    'Learn industry-standard software (Adobe Creative Suite)',
                    'Build a strong portfolio of work',
                    'Consider specialized courses in UI/UX design'
                ],
                technicalSkills: [
                    'Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
                    'Typography and layout design',
                    'Color theory and visual hierarchy',
                    'Digital illustration and photo editing',
                    'Print and digital design principles'
                ],
                softSkills: [
                    'Creativity and artistic vision',
                    'Client communication and feedback handling',
                    'Time management and project planning',
                    'Attention to detail and quality control',
                    'Adaptability to different design styles'
                ],
                experience: [
                    'Create personal design projects and portfolio',
                    'Take on freelance design work',
                    'Intern at design agencies or companies',
                    'Participate in design competitions',
                    'Build an online presence and network'
                ],
                progression: [
                    { title: 'Junior Designer (0-2 years)', description: 'Learn design principles and build technical skills' },
                    { title: 'Mid-level Designer (2-5 years)', description: 'Handle diverse projects and develop unique style' },
                    { title: 'Senior Designer (5-8 years)', description: 'Lead design projects and mentor junior designers' },
                    { title: 'Art Director (8+ years)', description: 'Oversee creative direction and design strategy' }
                ],
                futureOutlook: 'Graphic design is evolving with digital transformation. Skills in UI/UX design, motion graphics, and digital marketing are becoming increasingly valuable.'
            },
            'Web Developer': {
                overview: 'Web development involves creating websites and web applications. It\'s a dynamic field with constant technological advancements and excellent career opportunities.',
                detailedTimeline: {
                    'Year 1 (Foundation)': {
                        'Months 1-3': {
                            'Week 1-4': ['Learn HTML and CSS fundamentals', 'Study responsive design principles', 'Build simple static websites'],
                            'Week 5-8': ['Learn JavaScript basics', 'Study DOM manipulation', 'Create interactive web elements'],
                            'Week 9-12': ['Learn a frontend framework (React/Vue)', 'Study modern CSS (Flexbox, Grid)', 'Build portfolio projects']
                        },
                        'Months 4-6': ['Learn backend development (Node.js/Python)', 'Study database design and SQL', 'Build full-stack applications'],
                        'Months 7-9': ['Learn about APIs and web services', 'Study version control with Git', 'Deploy applications to cloud platforms'],
                        'Months 10-12': ['Learn about web security', 'Study performance optimization', 'Build production-ready applications']
                    },
                    'Year 2 (Specialization)': {
                        'Months 1-6': ['Specialize in frontend or backend', 'Learn advanced frameworks and tools', 'Work on real client projects'],
                        'Months 7-12': ['Learn DevOps and CI/CD', 'Study advanced web technologies', 'Build scalable applications']
                    },
                    'Year 3 (Advanced)': {
                        'Months 1-6': ['Lead web development projects', 'Mentor junior developers', 'Contribute to open source'],
                        'Months 7-12': ['Architect web solutions', 'Drive technical decisions', 'Lead development teams']
                    }
                },
                education: [
                    'Complete 12th in any stream',
                    'Learn web development through online courses',
                    'Build a strong portfolio of projects',
                    'Consider formal education in Computer Science',
                    'Obtain relevant certifications'
                ],
                technicalSkills: [
                    'HTML, CSS, and JavaScript',
                    'Frontend frameworks (React, Vue, Angular)',
                    'Backend technologies (Node.js, Python, PHP)',
                    'Database management (SQL, NoSQL)',
                    'Version control and deployment'
                ],
                softSkills: [
                    'Problem-solving and debugging',
                    'Attention to detail and quality',
                    'Client communication and feedback',
                    'Time management and project planning',
                    'Continuous learning and adaptation'
                ],
                experience: [
                    'Build personal projects and portfolio',
                    'Contribute to open source projects',
                    'Complete freelance web development work',
                    'Participate in web development communities',
                    'Create responsive and accessible websites'
                ],
                progression: [
                    { title: 'Junior Web Developer (0-2 years)', description: 'Focus on learning technologies and building basic websites' },
                    { title: 'Mid-level Developer (2-5 years)', description: 'Handle complex projects and mentor junior developers' },
                    { title: 'Senior Developer (5-8 years)', description: 'Lead technical decisions and architecture design' },
                    { title: 'Lead Developer/Architect (8+ years)', description: 'Drive technical strategy and mentor teams' }
                ],
                futureOutlook: 'Web development continues to grow with the increasing importance of online presence. Skills in modern frameworks, mobile-first design, and progressive web apps are highly valued.'
            },
            'Digital Marketer': {
                overview: 'Digital marketing involves promoting products and services through digital channels. It\'s a data-driven field with excellent growth potential.',
                detailedTimeline: {
                    'Year 1 (Foundation)': {
                        'Months 1-3': {
                            'Week 1-4': ['Learn digital marketing fundamentals', 'Study consumer behavior', 'Understand marketing channels'],
                            'Week 5-8': ['Learn SEO and content marketing', 'Study keyword research and optimization', 'Create content strategies'],
                            'Week 9-12': ['Learn social media marketing', 'Study platform-specific strategies', 'Build social media presence']
                        },
                        'Months 4-6': ['Learn paid advertising (Google Ads, Facebook Ads)', 'Study campaign management', 'Practice with small budgets'],
                        'Months 7-9': ['Learn email marketing and automation', 'Study analytics and reporting', 'Build email campaigns'],
                        'Months 10-12': ['Learn marketing analytics tools', 'Study conversion optimization', 'Complete comprehensive marketing projects']
                    },
                    'Year 2 (Specialization)': {
                        'Months 1-6': ['Specialize in specific channels', 'Learn advanced analytics', 'Work on real client campaigns'],
                        'Months 7-12': ['Learn marketing automation', 'Study advanced strategies', 'Build marketing systems']
                    },
                    'Year 3 (Advanced)': {
                        'Months 1-6': ['Lead marketing campaigns', 'Mentor junior marketers', 'Develop marketing strategies'],
                        'Months 7-12': ['Drive marketing innovation', 'Lead marketing teams', 'Develop brand strategies']
                    }
                },
                education: [
                    'Complete 12th in any stream',
                    'Learn digital marketing through online courses',
                    'Obtain relevant certifications (Google, Facebook, HubSpot)',
                    'Build practical experience through projects',
                    'Stay updated with industry trends'
                ],
                technicalSkills: [
                    'SEO and content marketing',
                    'Social media marketing',
                    'Paid advertising (PPC)',
                    'Email marketing and automation',
                    'Analytics and reporting tools'
                ],
                softSkills: [
                    'Creativity and content creation',
                    'Data analysis and interpretation',
                    'Client communication and relationship building',
                    'Strategic thinking and planning',
                    'Adaptability to changing trends'
                ],
                experience: [
                    'Create and manage social media accounts',
                    'Run small advertising campaigns',
                    'Build email marketing lists',
                    'Create content for various platforms',
                    'Analyze and optimize marketing performance'
                ],
                progression: [
                    { title: 'Digital Marketing Assistant (0-2 years)', description: 'Learn tools and execute basic campaigns' },
                    { title: 'Digital Marketing Specialist (2-5 years)', description: 'Manage campaigns and analyze performance' },
                    { title: 'Digital Marketing Manager (5-8 years)', description: 'Lead marketing strategies and teams' },
                    { title: 'Marketing Director (8+ years)', description: 'Drive overall marketing strategy and innovation' }
                ],
                futureOutlook: 'Digital marketing is rapidly evolving with AI, automation, and new platforms. Skills in data analysis, automation, and emerging technologies are becoming increasingly important.'
            }
        };

        // Return default data if specific career not found
        return roadmapData[careerPath] || {
            overview: `A career in ${careerPath} offers exciting opportunities for growth and development. Focus on building relevant skills and gaining practical experience.`,
            detailedTimeline: {
                'Year 1 (Foundation)': {
                    'Months 1-3': {
                        'Week 1-4': ['Research the career field thoroughly', 'Identify required skills and qualifications', 'Set up learning environment'],
                        'Week 5-8': ['Start learning basic skills', 'Join relevant communities and forums', 'Create a study plan'],
                        'Week 9-12': ['Begin formal education or training', 'Practice basic skills', 'Network with professionals']
                    },
                    'Months 4-6': ['Build foundational knowledge', 'Complete initial projects', 'Gain basic experience'],
                    'Months 7-9': ['Develop intermediate skills', 'Work on practical projects', 'Build professional network'],
                    'Months 10-12': ['Complete foundational training', 'Prepare for next level', 'Apply for entry-level positions']
                },
                'Year 2 (Development)': {
                    'Months 1-6': ['Secure entry-level position', 'Learn industry-specific tools', 'Develop specialized skills'],
                    'Months 7-12': ['Take on more responsibilities', 'Mentor junior professionals', 'Continue learning and growing']
                },
                'Year 3 (Advancement)': {
                    'Months 1-6': ['Lead projects and teams', 'Develop leadership skills', 'Contribute to industry knowledge'],
                    'Months 7-12': ['Establish expertise in the field', 'Mentor others', 'Drive innovation and growth']
                }
            },
            education: [
                'Complete your current education level',
                'Research specific degree requirements for your field',
                'Consider both formal education and certifications',
                'Stay updated with industry trends and requirements'
            ],
            technicalSkills: [
                'Industry-specific technical knowledge',
                'Relevant software and tools',
                'Data analysis and research skills',
                'Project management abilities',
                'Quality assurance and testing'
            ],
            softSkills: [
                'Communication and interpersonal skills',
                'Problem-solving and critical thinking',
                'Leadership and teamwork',
                'Adaptability and continuous learning',
                'Time management and organization'
            ],
            experience: [
                'Seek internships and entry-level positions',
                'Build a portfolio of relevant projects',
                'Join professional associations and networks',
                'Attend industry conferences and workshops',
                'Volunteer for relevant causes and organizations'
            ],
            progression: [
                { title: 'Entry Level (0-2 years)', description: 'Learn the basics and gain foundational experience' },
                { title: 'Mid Level (2-5 years)', description: 'Take on more responsibilities and specialize' },
                { title: 'Senior Level (5-8 years)', description: 'Lead projects and mentor junior professionals' },
                { title: 'Expert Level (8+ years)', description: 'Drive innovation and strategic decisions' }
            ],
            futureOutlook: 'Most career fields are evolving with technology and changing market demands. Continuous learning and adaptability are key to long-term success.'
        };
    };

    // Function to generate basic roadmap as fallback
    const generateBasicRoadmap = (careerPath) => {
        return `
            <div class="space-y-4">
                <div>
                    <h4 class="font-semibold text-gray-800">Educational Path:</h4>
                    <ul class="list-disc list-inside ml-4 text-gray-700">
                        <li>Complete your current education level</li>
                        <li>Research degree requirements for ${careerPath}</li>
                        <li>Consider relevant certifications</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-800">Skills to Develop:</h4>
                    <ul class="list-disc list-inside ml-4 text-gray-700">
                        <li>Technical skills relevant to your field</li>
                        <li>Communication and leadership abilities</li>
                        <li>Problem-solving and analytical thinking</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-800">Experience:</h4>
                    <ul class="list-disc list-inside ml-4 text-gray-700">
                        <li>Seek internships and entry-level positions</li>
                        <li>Build a portfolio of relevant projects</li>
                        <li>Network with professionals in your field</li>
                    </ul>
                </div>
            </div>
        `;
    };
    
    // Function to download the roadmap as a PDF
    const downloadPdf = () => {
        try {
            const roadmapContent = elements.roadmapContent;
            if (!roadmapContent || roadmapContent.innerHTML.trim() === '') {
                showNotification('Please generate a roadmap first before downloading.', 'error');
                return;
            }

            const options = {
                margin: 10,
                filename: `${state.finalResult.replace(/[^a-zA-Z0-9]/g, '_')}_Roadmap.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    allowTaint: true
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait' 
                }
            };

            // Show loading indicator
            const downloadBtn = elements.downloadPdfBtn;
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
            downloadBtn.disabled = true;

            html2pdf()
                .from(roadmapContent)
                .set(options)
                .save()
                .then(() => {
                    // Show success message
                    showNotification('PDF downloaded successfully!', 'success');
                })
                .catch((error) => {
                    console.error('PDF generation error:', error);
                    showNotification('Failed to generate PDF. Please try again.', 'error');
                })
                .finally(() => {
                    // Restore button
                    downloadBtn.innerHTML = originalText;
                    downloadBtn.disabled = false;
                });

        } catch (error) {
            console.error('PDF download error:', error);
            showNotification('An error occurred while downloading the PDF.', 'error');
        }
    };

    // Notification system
    const showNotification = (message, type = 'info') => {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification fixed top-24 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
        
        const bgColor = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500';
        const icon = type === 'error' ? 'fas fa-exclamation-circle' : type === 'success' ? 'fas fa-check-circle' : 'fas fa-info-circle';
        
        notification.innerHTML = `
            <div class="flex items-center ${bgColor} text-white">
                <i class="${icon} mr-2"></i>
                <span>${message}</span>
                <button class="ml-auto text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.add('translate-x-full');
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    };

    // Chatbot functions
    const appendMessage = (sender, message) => {
        const messageDiv = document.createElement('div');
        if (sender === 'user') {
            messageDiv.classList.add('user-message');
            messageDiv.textContent = message;
        } else {
            messageDiv.classList.add('bot-message');
            messageDiv.innerHTML = `<div class="bot-avatar"><i class="fa-solid fa-robot"></i></div><p>${message}</p>`;
        }
        elements.chatMessages.appendChild(messageDiv);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    };

    const handleChatSend = async () => {
        const message = elements.chatInput.value.trim();
        if (message === '') return;
        
        appendMessage('user', message);
        elements.chatInput.value = '';

        // Show a typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('bot-message');
        typingIndicator.innerHTML = `<div class="bot-avatar"><i class="fa-solid fa-robot"></i></div><div class="loading-dots"><div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div></div>`;
        elements.chatMessages.appendChild(typingIndicator);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
        
        try {
            const prompt = `Answer the following question about career paths, education, or general knowledge. Be concise and helpful. Question: "${message}"`;
            const payload = { contents: [{ parts: [{ text: prompt }] }] };
            const apiKey = "AIzaSyCpD83zSZEqon2J_2GnsVcKQOIzvJ7DZko";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                throw new Error(`API call failed with status ${response.status}`);
            }
            
            const result = await response.json();
            
            elements.chatMessages.removeChild(typingIndicator);
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                appendMessage('bot', text);
            } else {
                appendMessage('bot', "Sorry, I couldn't process that. Please try again.");
            }
        } catch (error) {
            console.error("Chatbot API call failed:", error);
            elements.chatMessages.removeChild(typingIndicator);
            appendMessage('bot', "An error occurred. Please try again later.");
        }
    };

    // Dark Mode Toggle Logic
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        elements.darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun text-yellow-300"></i><span class="icon-fallback"></span>' : '<i class="fas fa-moon text-gray-800"></i><span class="icon-fallback"></span>';
    };

    // Event Listeners
    elements.startJourneyBtn.addEventListener('click', () => {
        const name = elements.nameInput.value.trim();
        if (name) {
            state.userName = name;
            localStorage.setItem('userName', name);
            elements.userDisplayName.textContent = `Welcome, ${name}`;
            elements.userDisplayName.classList.remove('hidden');
            showScreen('welcome1');
        } else {
            showNotification('Please enter your name to continue.', 'error');
            elements.nameInput.focus();
        }
    });

    elements.button10th.addEventListener('click', () => {
        state.quizType = '10th';
        showScreen('quizIntro');
    });

    elements.button12th.addEventListener('click', () => {
        state.quizType = '12th';
        showScreen('quizIntro');
    });

    elements.startQuizBtn.addEventListener('click', () => {
        showScreen('quiz');
        elements.progressBarContainer.classList.remove('hidden');
        renderQuestion();
    });

    elements.restartQuizBtn.addEventListener('click', () => {
        restartQuiz();
    });

    elements.roadMapBtn.addEventListener('click', () => {
        generateRoadmap();
    });

    elements.downloadPdfBtn.addEventListener('click', () => {
        downloadPdf();
    });

    elements.closeModalBtn.addEventListener('click', () => {
        screens.roadmapModal.classList.add('hidden');
    });

    elements.chatbotToggleBtn.addEventListener('click', () => {
        elements.chatbotBubble.classList.toggle('hidden');
    });

    elements.closeChatBtn.addEventListener('click', () => {
        elements.chatbotBubble.classList.add('hidden');
    });

    elements.chatSendBtn.addEventListener('click', handleChatSend);
    elements.chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleChatSend();
        }
    });

    elements.darkModeToggle.addEventListener('click', toggleDarkMode);

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close modal if open
            if (!screens.roadmapModal.classList.contains('hidden')) {
                screens.roadmapModal.classList.add('hidden');
            }
            // Close chatbot if open
            if (!elements.chatbotBubble.classList.contains('hidden')) {
                elements.chatbotBubble.classList.add('hidden');
            }
        }
    });

    // Initial state check
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        elements.darkModeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i><span class="icon-fallback"></span>';
    } else {
        elements.darkModeToggle.innerHTML = '<i class="fas fa-moon text-gray-800"></i><span class="icon-fallback"></span>';
    }

    if (state.userName) {
        elements.nameInput.value = state.userName;
        elements.userDisplayName.textContent = `Welcome, ${state.userName}`;
        elements.userDisplayName.classList.remove('hidden');
        showScreen('welcome1');
    } else {
        showScreen('home');
    }
});
