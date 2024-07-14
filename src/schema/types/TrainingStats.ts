import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

export const TrainingStatsType = new GraphQLObjectType({
  name: 'TrainingStats',
  fields: {
    buzzer_expected: {
      type: GraphQLString,
    },
    buzzer_pressed: {
      type: GraphQLString,
    },
    reaction_time: {
      type: GraphQLInt,
    },
    pressed_at: {
      type: GraphQLString,
    },
  },
});
