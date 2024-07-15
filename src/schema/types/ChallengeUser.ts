import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import exerciseResolver from '../../resolvers/exerciseResolver';
import categoryResolver from '../../resolvers/categoryResolver';
import { UserType } from './User';
import userResolver from '../../resolvers/userResolver';
import { TrainingType } from './Training';
import trainingResolver from '../../resolvers/trainingResolver';
import { UserChallengesType } from './UserChallenges';

export const ChallengeUserType = new GraphQLObjectType({
  name: 'ChallengeUser',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLString,
    },
    photo: {
      type: GraphQLString,
    },
    end_at: {
      type: GraphQLString,
    },
    training: {
      type: TrainingType,
      resolve: async (obj) => {
        return await trainingResolver.Query.trainingById({
          id: obj.training_id,
        });
      },
    },
    type: {
      type: GraphQLString,
    },
    participants: {
      type: new GraphQLList(UserChallengesType),
      resolve: async (obj) => {
        const participantPromises = Object.values(obj.participants).map(
          async (participant: any) => {
            const user = await userResolver.Query.user({
              idUser: participant.idUser,
            });
            return {
              score: participant.score,
              user: user,
            };
          }
        );
        return await Promise.all(participantPromises);
      },
    },
    invites: {
      type: new GraphQLList(UserType),
      resolve: async (obj) => {
        const data = obj.invites.map(async (invite: String) => {
          console.log('invite', invite);
          return await userResolver.Query.user({
            idUser: invite,
          });
        });
        return await Promise.all(data);
      },
    },
    author: {
      type: UserType,
      resolve: async (obj) => {
        return await userResolver.Query.user({
          idUser: obj.author_id,
        });
      },
    },
  },
});
