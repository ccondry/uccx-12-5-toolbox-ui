const imageFolder = 'https://mm.cxdemo.net/static/images/cumulus/common'
const getters = {
  agents: (state, getters) => {
    return [
      {
        picture: imageFolder + '/sandra.png',
        finesseUsername: 'sjeffers' + getters.jwtUser.id,
        rdpUsername: 'sjeffers' + getters.jwtUser.id,
        password: 'C1sco12345',
        extension: '1080' + getters.jwtUser.id,
        name: 'Sandra Jefferson',
        role: 'Agent',
        description: 'Main Agent'
      },
      {
        picture: imageFolder + '/josh.png',
        finesseUsername: 'jopeters' + getters.jwtUser.id,
        rdpUsername: 'jopeters' + getters.jwtUser.id,
        password: 'C1sco12345',
        extension: '1081' + getters.jwtUser.id,
        name: 'Josh Peterson',
        role: 'Agent',
        description: 'CRM Agent'
      },
      {
        picture: imageFolder + '/rick.png',
        finesseUsername: 'rbarrows' + getters.jwtUser.id + '@dcloud.cisco.com',
        rdpUsername: 'rbarrows' + getters.jwtUser.id,
        password: 'C1sco12345',
        extension: '1082' + getters.jwtUser.id,
        name: 'Rick Barrows',
        role: 'Supervisor',
        description: 'Main Supervisor'
      },
      {
        picture: imageFolder + '/helen.png',
        finesseUsername: 'hliang' + getters.jwtUser.id,
        rdpUsername: 'hliang' + getters.jwtUser.id,
        password: 'C1sco12345',
        extension: '1083' + getters.jwtUser.id,
        name: 'Helen Liang',
        role: 'Agent',
        description: '2Ring Agent'
      },
      {
        picture: imageFolder + '/james.png',
        finesseUsername: 'jabracks' + getters.jwtUser.id + '@dcloud.cisco.com',
        rdpUsername: 'jabracks' + getters.jwtUser.id,
        password: 'C1sco12345',
        extension: '1084' + getters.jwtUser.id,
        name: 'James Bracksted',
        role: 'Supervisor',
        description: '2Ring Supervisor'
      }
    ]
  }
}

export default {
  getters
}