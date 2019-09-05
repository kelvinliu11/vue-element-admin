import Mock from 'mockjs'

const List = []
const count = 100

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

const system = ''
const tomcatPort = 1
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    physicalIP: '@integer(1, 255).@integer(1, 255).@integer(1, 255).@integer(1, 255)',
    virtualIP: '@integer(1, 255).@integer(1, 255).@integer(1, 255).@integer(1, 255)',
    system: '@title(1, 1)',
    tomcatPort: '@integer(7000, 8000)',
    jmxPort: tomcatPort + 600,
    zabbixPort: '@integer(10000, 65535)',
    dockerName: 'dockername-@title(1, 1)',
    jenkinsName: 'jenkinsname-@title(1, 1)',
    configFile: '/share/tomcat_conf/' + system,
    serverLog: '/home/logs/' + system + '/service',
    catalinaHome: '/home/logs/' + system + '/tomcat',
    jenkinsParams: 'sh /home/jenkins_shell/jenkins.sh 7201 7801 10051 eureka-A eureka-A 215 172.24.2.20'
    // System: +Mock.Random.date('T'),
    // author: '@first',
    // reviewer: '@first',
    // title: '@title(5, 10)',
    // content_short: 'mock data',
    // content: baseContent,
    // forecast: '@float(0, 100, 2, 2)',
    // importance: '@integer(1, 3)',
    // 'type|1': ['CN', 'US', 'JP', 'EU'],
    // 'status|1': ['published', 'draft', 'deleted'],
    // display_time: '@datetime',
    // comment_disabled: true,
    // pageviews: '@integer(1, 255).@integer(1, 255).@integer(1, 255).@integer(1, 255)',
    // image_uri,
    // platforms: ['a-platform']
  }))
}

export default [
  {
    url: '/machine/list',
    type: 'get',
    response: config => {
      // const { importance, type, title, page = 1, limit = 20, sort } = config.query
      const { physicalIP, virtualIP, system, tomcatPort, jmxPort, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (physicalIP && item.physicalIP !== physicalIP) return false
        if (virtualIP && item.virtualIP !== virtualIP) return false
        if (system && item.system !== system) return false
        if (tomcatPort && item.tomcatPort !== tomcatPort) return false
        if (jmxPort && item.jmxPort !== jmxPort) return false
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

