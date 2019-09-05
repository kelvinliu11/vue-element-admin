import Mock from 'mockjs'

const List = []
const count = 100

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'environment|1': ['生产环境', 'Demo', '测试环境', '开发环境'],
    // 'type|1': ['CN', 'US', 'JP', 'EU'],
    businessDomain: '信贷工厂 - APM',
    systemName: '@first',
    system: '@first',
    peopleInCharge: '@first',
    ressourceStatus: '已创建',
    runStatus: '正常'
  }))
}

export default [
  {
    url: '/machine/list',
    type: 'get',
    response: config => {
      // const { importance, type, title, page = 1, limit = 20, sort } = config.query
      const { environment, businessDomain, systemName, peopleInCharge, ressourceStatus, runStatus, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (environment && item.environment !== environment) return false
        if (businessDomain && item.businessDomain !== businessDomain) return false
        if (systemName && item.systemName !== systemName) return false
        if (peopleInCharge && item.peopleInCharge !== peopleInCharge) return false
        if (ressourceStatus && item.ressourceStatus !== ressourceStatus) return false
        if (runStatus && item.runStatus !== runStatus) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/machine/submitPeopleInCharge',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/machine/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/machine/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/machine/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/machine/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

