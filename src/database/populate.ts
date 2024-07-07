import database from './';

const users = [
  {
    id: 1,
    last_name: 'Dupont',
    first_name: 'Jean',
    profile_photo: 'http://example.com/photo_jean.png',
    strike_count: 0,
    created_at: new Date(),
    username: 'jeandup',
    email: 'jean.dupont@example.com',
    fitness_goal: 'Perdre du poids',
    postal_address: '123 Rue Exemple, Paris, France',
    birth_date: '1990-01-01',
    height_cm: 175,
    weight_kg: 70,
    target_weight: 65,
    waist_size: 80,
    arm_size: 35,
  },
  {
    id: 2,
    last_name: 'Curie',
    first_name: 'Marie',
    profile_photo: 'http://example.com/photo_marie.png',
    strike_count: 0,
    created_at: new Date(),
    username: 'mariecurie',
    email: 'marie.curie@example.com',
    fitness_goal: 'Gagner en souplesse',
    postal_address: '456 Rue Exemple, Lyon, France',
    birth_date: '1985-07-10',
    height_cm: 160,
    weight_kg: 55,
    target_weight: 55,
    waist_size: 70,
    arm_size: 30,
  },
];

const categories = [
  {
    id: 1,
    category: 'Endurance',
  },
  {
    id: 2,
    category: 'Flexibilité',
  },
];

const exercises = [
  {
    id: 1,
    title: 'Course à pied',
    description: "Une course rapide pour améliorer l'endurance.",
    sequence: [1, 2, 3],
    repetitions: 3,
    pod_count: 2,
    player_count: 1,
    calories_burned: 300,
    author: 'Jean Dupont',
    score: 8.5,
    level: 'Intermédiaire',
    created_at: new Date(),
  },
  {
    id: 2,
    title: 'Yoga Matinal',
    description: 'Séance de yoga pour bien commencer la journée.',
    sequence: [1, 2, 3],
    repetitions: 1,
    pod_count: 1,
    player_count: 1,
    calories_burned: 150,
    author: 'Marie Curie',
    score: 9.0,
    level: 'Débutant',
    created_at: new Date(),
  },
];

const exercisesMedia = [
  {
    id: 1,
    exercise_id: 1,
    url_photo: 'http://example.com/photo_course.png',
    type: 'png',
    created_at: new Date(),
  },
  {
    id: 2,
    exercise_id: 2,
    url_photo: 'http://example.com/photo_yoga.png',
    type: 'png',
    created_at: new Date(),
  },
];

const categoriesExercises = [
  {
    category_id: 1,
    exercise_id: 1,
  },
  {
    category_id: 2,
    exercise_id: 2,
  },
];

const activities = [
  {
    id: 1,
    exercise_id: 1,
    author: 'Pierre Durand',
    laps: 3,
    pause_between_laps: 60,
    calories_burned: 400,
    status: 'En cours',
    feeling: 'Bien',
    steps: 5000,
    start_at: new Date(),
    end_at: new Date(),
    created_at: new Date(),
    avg_bpm: 140,
    max_bpm: 180,
    avg_speed: 10.0,
    max_speed: 15.0,
    participants: [1, 2],
    player_count: 2,
  },
  {
    id: 2,
    exercise_id: 2,
    author: 'Alice Martin',
    laps: 1,
    pause_between_laps: 0,
    calories_burned: 100,
    status: 'Terminé',
    feeling: 'Excellent',
    steps: 0,
    start_at: new Date(),
    end_at: new Date(),
    created_at: new Date(),
    avg_bpm: 80,
    max_bpm: 100,
    avg_speed: 0.0,
    max_speed: 0.0,
    participants: [1],
    player_count: 1,
  },
];

const training = [
  {
    id: 1,
    title: 'Entraînement Matinal',
    description: 'Programme pour bien démarrer la journée.',
    activities_list: [1, 2],
    author: 1,
    status: 'En cours',
    planned_at: new Date(),
    start_at: new Date(),
    end_at: new Date(),
    created_at: new Date(),
  },
];

const sessionReactionsUsers = [
  {
    session_id: 1,
    user_id: 1,
    created_at: new Date(),
  },
];

const pods = [
  {
    id: 1,
    set_pods_id: 1,
    owner_user_id: 1,
    current_state: 'Actif',
    created_at: new Date(),
  },
  {
    id: 2,
    set_pods_id: 2,
    owner_user_id: 2,
    current_state: 'Inactif',
    created_at: new Date(),
  },
];

const comments = [
  {
    id: 1,
    session_id: 1,
    user_id: 1,
    text: 'Super session, très motivant!',
  },
  {
    id: 2,
    session_id: 1,
    user_id: 2,
    text: "J'ai adoré cette séance.",
  },
];

const reportReasons = [
  {
    id: 1,
    label: 'Inapproprié',
  },
];

const commentReports = [
  {
    id: 1,
    comment_id: 1,
    user_id: 2,
    reason_id: 1,
    created_at: new Date(),
  },
];

const rewards = [
  {
    id: 1,
    user_id: 1,
    reward_type: 'Badge',
    reward_value: 1,
    description: 'Récompense pour avoir complété 10 sessions.',
    created_at: new Date(),
    used_at: null,
  },
];

const strikes = [
  {
    id: 1,
    user_id: 1,
    start_date: '2023-01-01',
    end_date: '2023-01-10',
    current_strike: 1,
    max_strike: 3,
    created_at: new Date(),
  },
];

const userCalendar = [
  {
    id: 1,
    user_id: 1,
    date: '2023-01-01',
    activity_completed: true,
    created_at: new Date(),
  },
];

const userGoals = [
  {
    id: 1,
    user_id: 1,
    goal_type: 'Poids',
    goal_value: 65.0,
    current_progress: 68.0,
    start_date: new Date(),
    end_date: new Date(),
    achieved: false,
    created_at: new Date(),
  },
];

const badges = [
  {
    id: 1,
    name: 'Débutant',
    description: 'Premier badge de débutant',
    icon_url: 'http://example.com/icon_debutant.png',
    created_at: new Date(),
  },
];

const userBadges = [
  {
    id: 1,
    user_id: 1,
    badge_id: 1,
    awarded_at: new Date(),
  },
];

const notifications = [
  {
    id: 1,
    user_id: 1,
    notification_type: 'Info',
    message: 'Votre séance est planifiée pour demain.',
    read: false,
    sent_at: new Date(),
    created_at: new Date(),
  },
];

const populateDatabase = async () => {
  console.log('Peuplement de la base de données…\n');

  await database.from('users').upsert(users);
  await database.from('categories').upsert(categories);
  await database.from('exercises').upsert(exercises);
  await database.from('exercises_media').upsert(exercisesMedia);
  await database.from('categories_exercises').upsert(categoriesExercises);
  await database.from('activities').upsert(activities);
  await database.from('training').upsert(training);
  await database.from('session_reactions_users').upsert(sessionReactionsUsers);
  await database.from('pods').upsert(pods);
  await database.from('comments').upsert(comments);
  await database.from('report_reasons').upsert(reportReasons);
  await database.from('comment_reports').upsert(commentReports);
  await database.from('rewards').upsert(rewards);
  await database.from('strikes').upsert(strikes);
  await database.from('user_calendar').upsert(userCalendar);
  await database.from('user_goals').upsert(userGoals);
  await database.from('badges').upsert(badges);
  await database.from('user_badges').upsert(userBadges);
  await database.from('notifications').upsert(notifications);

  console.log('Base de données peuplée !\n');
};

export default populateDatabase;
