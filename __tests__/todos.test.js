const setup = require('../data/setup');
const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '123456',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('blog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });
  it('GET api/v1/todos should return a list of todos', async () => {
    const [agent] = await registerAndLogin();
    const resp = await agent.get('/api/v1/todos');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot();
  });
});
