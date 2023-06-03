import { GraphQLScalarType, Kind } from 'graphql';

const regexId = /^([TVC])[1-9][0-9]{2}$/;

const checkId = (value) => {
  return regexId.test(value);
};

const RoomIDScalar = new GraphQLScalarType({
  name: 'RoomID',
  description: 'Custom ID for roomId: [CTV][1-9][0-9]{2}',
  parseValue(value: string) {
    if (!checkId(value)) {
      throw new Error('Invalid roomId format');
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING || !checkId(ast.value)) {
      throw new Error('Invalid roomId format');
    }
    return ast.value;
  },
  serialize(value) {
    return value;
  },
});

export { RoomIDScalar as RoomID };
