import { GraphQLScalarType, Kind } from 'graphql';

const RoomGuestNameScalar = new GraphQLScalarType({
  name: 'GuestName',
  parseValue(value: string) {
    if (/\d/.test(value)) {
      throw new Error('guestName does have numbers');
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING || /\d/.test(ast.value)) {
      throw new Error('guestName does have numbers');
    }
    return ast.value;
  },
  serialize(value) {
    return value;
  },
});

export { RoomGuestNameScalar as RoomGuestName };
