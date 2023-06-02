import { GraphQLScalarType, Kind } from 'graphql';

const RoomIDScalar = new GraphQLScalarType({
  name: 'RoomID',
  description: 'Custom ID for roomId',
  parseValue(value: string) {
    if (!/^([TVC])[1-9]{3}$/.test(value)) {
      throw new Error('Invalid roomId format');
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING || !/^([TVC])[1-9]{3}$/.test(ast.value)) {
      throw new Error('Invalid roomId format');
    }
    return ast.value;
  },
  serialize(value) {
    return value;
  },
});

export { RoomIDScalar as RoomID };
