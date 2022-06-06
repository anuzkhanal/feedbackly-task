import { Router } from "express"

import Data from "../models/data";




const router = Router();

const delay = () => new Promise(resolve => setTimeout(resolve, 3000))

let totalPromotors = 0
let totalDetractors = 0
let totalNps = 0

router.get("/emoticon-average", async (_, res) => {
  const datas = await Data.find()
  const pipelineTotal = [
    { $match: { type: 'Emoticon' } },
    { $count: 'total' }

  ]

  const total = await Data.aggregate(pipelineTotal)

  const pipelineAverage = [
    {
      '$match': {
        'type': 'Emoticon'
      }
    }, {
      '$group': {
        '_id': '$type',
        'avg': {
          '$avg': '$value'
        }
      }
    }
  ]

  const average = await Data.aggregate(pipelineAverage)

  // Get the average value of emoticons using the Mongo aggregation pipeline
  await delay();
  res.json({ average: average[0].avg, total: total[0].total })
})


router.get("/nps-groups", async (_, res) => {
  const pipelineTotal = [
    {
      '$match': {
        'type': 'NPS'
      }
    }, {
      '$count': 'total'
    }
  ]

  const pipelineTypeTotal = [
    {
      '$match': {
        'type': 'NPS'
      }
    }, {
      '$project': {
        '_id': '$type',
        'result': {
          '$switch': {
            'branches': [
              {
                'case': {
                  '$gte': [
                    '$value', 9
                  ]
                },
                'then': 'Promoter'
              }, {
                'case': {
                  '$lte': [
                    '$value', 6
                  ]
                },
                'then': 'Detractor'
              }, {
                'case': {
                  '$and': [
                    {
                      '$gt': [
                        '$value', 6
                      ]
                    }, {
                      '$lt': [
                        '$value', 9
                      ]
                    }
                  ]
                },
                'then': 'Passive'
              }
            ],
            'default': 'Not Found'
          }
        }
      }
    }, {
      '$group': {
        '_id': '$result',
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        '_id': 1
      }
    }
  ]


  const total = await Data.aggregate(pipelineTotal)

  const typeTotal = await Data.aggregate(pipelineTypeTotal)

  totalPromotors = typeTotal[2].count

  totalDetractors = typeTotal[0].count

  totalNps = total[0].total

  // Get the number of NPS responses per group using the Mongo aggregation pipeline
  await delay();
  res.json({ promoters: totalPromotors, detractors: totalDetractors, passives: typeTotal[1].count, total: totalNps })
})



router.get("/nps-score", async (_, res) => {

  let percentagePromoters = (totalPromotors / totalNps) * 100
  let percentageDetractors = (totalDetractors / totalNps) * 100

  let score = percentagePromoters - percentageDetractors


  // BONUS! Calculate NPS score from nps groups
  await delay();
  res.json({ score: score })
})

router.get('/all', async (req, res) => {
  const datas = await Data.find()
  res.send(datas)
})
export default router;
