drop table if exists Exercises cascade;
drop table if exists Exercises_Media cascade;
drop table if exists Categories_Exercises cascade;
drop table if exists Categories cascade;
drop table if exists Activities cascade;
drop table if exists Training cascade;
drop table if exists Session_Reactions_Users cascade;
drop table if exists Users cascade;
drop table if exists Pods cascade;
drop table if exists Comments cascade;
drop table if exists Comment_Reports cascade;
drop table if exists Report_Reasons cascade;
drop table if exists Rewards cascade;
drop table if exists Strikes cascade;
drop table if exists User_Calendar cascade;
drop table if exists User_Goals cascade;
drop table if exists Badges cascade;
drop table if exists User_Badges cascade;
drop table if exists Notifications cascade;

create table Exercises_Difficulty {
  id integer primary key,
  label varchar 
}

create table Exercises (
  id integer primary key,
  title varchar,
  description text,
  sequence integer[],
  repetitions integer,
  pod_count integer,
  player_count integer,
  duration integer,
  calories_burned integer,
  author varchar,
  score float,
  difficulty  integer references Exercises_Difficulty(id),
  created_at timestamp
);

create table Exercises_Media (
  id integer primary key,
  exercise_id integer references Exercises(id),
  url_photo varchar,
  type varchar,
  created_at timestamp
);

create table Categories (
  id integer primary key,
  category varchar
);

create table Categories_Exercises (
  category_id integer references Categories(id),
  exercise_id integer references Exercises(id),
  primary key (category_id, exercise_id)
);

create table Activities_Status {
  id integer primary key,
  label varchar 
};

create table Activities_Feeling {
  id integer primary key,
  label varchar 
};

create table Activities (
  id integer primary key,
  exercise_id integer references Exercises(id),
  author varchar,
  laps integer,
  pause_between_laps integer,
  calories_burned integer,
  status integer references Activities_Status(id),
  feeling integer references Activities_Feeling(id),
  steps integer,
  start_at timestamp,
  end_at timestamp,
  created_at timestamp,
  avg_bpm integer,
  max_bpm integer,
  avg_speed float,
  max_speed float,
  participants integer[],
  player_count integer
);

create table Training_Status {
  id integer primary key,
  label varchar 
};

create table Training (
  id integer primary key,
  title varchar,
  description text,
  activities_list integer[],
  author integer references Users(id),
  status integer references Training_Status(id),
  planned_at timestamp,
  start_at timestamp,
  end_at timestamp,
  created_at timestamp
);

create table Session_Reactions_Users (
  session_id integer references Activities(id),
  user_id integer references Users(id),
  created_at timestamp,
  primary key (session_id, user_id)
);

create table Users (
  id integer primary key,
  last_name varchar,
  first_name varchar,
  profile_photo varchar,
  strike_count integer,
  created_at timestamp,
  username varchar,
  email varchar,
  fitness_goal varchar,
  postal_address text,
  birth_date date,
  height_cm integer,
  weight_kg integer,
  target_weight integer,
  waist_size integer,
  arm_size integer
);

create table Pods_State {
  id integer primary key,
  label varchar 
};

create table Pods (
  id integer primary key,
  set_pods_id integer,
  owner_user_id integer references Users(id),
  current_state integer references Pods_State(id),
  created_at timestamp
);

create table Comments (
  id integer primary key,
  session_id integer references Training(id),
  user_id integer references Users(id),
  text text
);

create table Comment_Reports (
  id integer primary key,
  comment_id integer references Comments(id),
  user_id integer references Users(id),
  reason_id integer references Report_Reasons(id),
  created_at timestamp
);

create table Report_Reasons (
  id integer primary key,
  label text
);

create table Rewards (
  id integer primary key,
  user_id integer references Users(id),
  reward_type varchar,
  reward_value integer,
  description text,
  created_at timestamp,
  used_at timestamp
);

create table Strikes (
  id integer primary key,
  user_id integer references Users(id),
  start_date date,
  end_date date,
  current_strike integer,
  max_strike integer,
  created_at timestamp
);

create table User_Calendar (
  id integer primary key,
  user_id integer references Users(id),
  date date,
  activity_completed boolean,
  created_at timestamp
);

create table Goals {
  id integer primary key,
  goal_type varchar
};

create table User_Goals (
  id integer primary key,
  user_id integer references Users(id),
  goal_type integer references Goals(id),
  goal_value float,
  current_progress float,
  start_date timestamp,
  end_date timestamp,
  achieved boolean,
  created_at timestamp
);

create table Badges (
  id integer primary key,
  name varchar,
  description text,
  icon_url varchar,
  created_at timestamp
);

create table User_Badges (
  id integer primary key,
  user_id integer references Users(id),
  badge_id integer references Badges(id),
  awarded_at timestamp
);

create table Notifications (
  id integer primary key,
  user_id integer references Users(id),
  notification_type varchar,
  message text,
  read boolean,
  sent_at timestamp,
  created_at timestamp
);
