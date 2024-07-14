import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';

export const ActivityType = new GraphQLObjectType({
  name: 'Activity',
  fields: {
    id: { type: GraphQLID },
    exercise_id: { type: GraphQLInt },
    author: { type: GraphQLString },
    laps: { type: GraphQLInt },
    pause_between_laps: { type: GraphQLInt },
    calories_burned: { type: GraphQLInt },
    status: { type: GraphQLString },
    feeling: { type: GraphQLString },
    steps: { type: GraphQLInt },
    start_at: { type: GraphQLString },
    end_at: { type: GraphQLString },
    created_at: { type: GraphQLString },
    avg_bpm: { type: GraphQLInt },
    max_bpm: { type: GraphQLInt },
    avg_speed: { type: GraphQLFloat },
    max_speed: { type: GraphQLFloat },
    participants: { type: new GraphQLList(GraphQLInt) },
    player_count: { type: GraphQLInt },
  },
});
