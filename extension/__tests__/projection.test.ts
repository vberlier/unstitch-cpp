import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'
import { Language, Parser, Query, Tree } from 'web-tree-sitter'

import { buildProjection } from '../projection'
import { QUERY } from '../query'
import exampleCpp from '../../example.cpp?raw'

let parserInitialized = false
let parser: Parser
let query: Query

beforeAll(async () => {
  if (!parserInitialized) {
    await Parser.init({ locateFile: () => 'web-tree-sitter.wasm' })
    parserInitialized = true
  }

  const language = await Language.load('tree-sitter-cpp.wasm')

  parser = new Parser()
  parser.setLanguage(language)

  query = new Query(language, QUERY)
})

afterAll(() => {
  parser.delete()
  query.delete()
})

let tree: Tree | null = null

afterEach(() => {
  tree?.delete()
})

test('example', () => {
  tree = parser.parse(exampleCpp)
  const p = buildProjection(tree!.rootNode, query.captures(tree!.rootNode))
  expect(
    JSON.stringify(
      p,
      (k, v) =>
        v instanceof Map
          ? Object.fromEntries(v.entries())
          : k === 'node'
            ? `L${v.startPosition.row + 1}`
            : k === 'parent' ||
                k === 'predecessor' ||
                k === 'outer' ||
                k === 'stitch' ||
                k === 'declaration'
              ? undefined
              : v,
      2,
    ),
  ).toMatchInlineSnapshot(
    `
    "{
      "declarations": {
        "162": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L6",
            "index": 162,
            "children": []
          },
          "identifier": "KeyboardEventSubscriber",
          "unmangled": {
            "name": "KeyboardEventSubscriber",
            "n": -1,
            "tag": ""
          },
          "references": []
        },
        "236": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L11",
            "index": 236,
            "children": []
          },
          "identifier": "SetThrottleInput",
          "unmangled": {
            "name": "SetThrottleInput",
            "n": -1,
            "tag": ""
          },
          "references": []
        },
        "301": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L16",
            "index": 301,
            "children": []
          },
          "identifier": "m_Throttle",
          "unmangled": {
            "name": "m_Throttle",
            "n": -1,
            "tag": ""
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L73",
                "index": 1534,
                "children": []
              }
            },
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L93",
                "index": 1977,
                "children": []
              }
            },
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L102",
                "index": 2205,
                "children": []
              }
            },
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L112",
                "index": 2367,
                "children": []
              }
            },
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L121",
                "index": 2598,
                "children": []
              }
            }
          ]
        },
        "333": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L17",
            "index": 333,
            "children": []
          },
          "identifier": "m_VehicleMovement",
          "unmangled": {
            "name": "m_VehicleMovement",
            "n": -1,
            "tag": ""
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L70",
                "index": 1458,
                "children": []
              }
            }
          ]
        },
        "407": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L20",
            "index": 407,
            "children": []
          },
          "identifier": "keyboardEventSubscriber_0Internal",
          "unmangled": {
            "name": "keyboardEventSubscriber",
            "n": 0,
            "tag": "Internal"
          },
          "references": []
        },
        "687": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L33",
            "index": 687,
            "children": []
          },
          "identifier": "keyboardEventSubscriber_1Internal",
          "unmangled": {
            "name": "keyboardEventSubscriber",
            "n": 1,
            "tag": "Internal"
          },
          "references": []
        },
        "967": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L46",
            "index": 967,
            "children": []
          },
          "identifier": "keyboardEventSubscriber_2Internal",
          "unmangled": {
            "name": "keyboardEventSubscriber",
            "n": 2,
            "tag": "Internal"
          },
          "references": []
        },
        "1177": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L58",
            "index": 1177,
            "children": []
          },
          "identifier": "m_Counter_0Internal",
          "unmangled": {
            "name": "m_Counter",
            "n": 0,
            "tag": "Internal"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L63",
                "index": 1267,
                "children": []
              }
            },
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L65",
                "index": 1339,
                "children": []
              }
            },
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L86",
                "index": 1854,
                "children": []
              }
            }
          ]
        },
        "1212": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L60",
            "index": 1212,
            "children": []
          },
          "identifier": "Enter_0",
          "unmangled": {
            "name": "Enter",
            "n": 0,
            "tag": ""
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L105",
                "index": 2257,
                "children": []
              }
            },
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L124",
                "index": 2650,
                "children": []
              }
            }
          ]
        },
        "1240": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L62",
            "index": 1240,
            "children": []
          },
          "identifier": "n_0Input",
          "unmangled": {
            "name": "n",
            "n": 0,
            "tag": "Input"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L63",
                "index": 1289,
                "children": []
              }
            }
          ]
        },
        "1325": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L65",
            "index": 1325,
            "children": []
          },
          "identifier": "counter_0",
          "unmangled": {
            "name": "counter",
            "n": 0,
            "tag": ""
          },
          "references": []
        },
        "1434": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L70",
            "index": 1434,
            "children": []
          },
          "identifier": "vehicleMovement_0Pure",
          "unmangled": {
            "name": "vehicleMovement",
            "n": 0,
            "tag": "Pure"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L76",
                "index": 1641,
                "children": []
              }
            }
          ]
        },
        "1517": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L73",
            "index": 1517,
            "children": []
          },
          "identifier": "throttle_0Pure",
          "unmangled": {
            "name": "throttle",
            "n": 0,
            "tag": "Pure"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L77",
                "index": 1700,
                "children": []
              }
            }
          ]
        },
        "1616": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L76",
            "index": 1616,
            "children": []
          },
          "identifier": "vehicleMovement_0Input",
          "unmangled": {
            "name": "vehicleMovement",
            "n": 0,
            "tag": "Input"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L78",
                "index": 1728,
                "children": []
              }
            }
          ]
        },
        "1682": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L77",
            "index": 1682,
            "children": []
          },
          "identifier": "throttle_0Input",
          "unmangled": {
            "name": "throttle",
            "n": 0,
            "tag": "Input"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L78",
                "index": 1768,
                "children": []
              }
            }
          ]
        },
        "1830": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L84",
            "index": 1830,
            "children": []
          },
          "identifier": "Reset_0",
          "unmangled": {
            "name": "Reset",
            "n": 0,
            "tag": ""
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L50",
                "index": 1068,
                "children": []
              }
            }
          ]
        },
        "1904": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L90",
            "index": 1904,
            "children": []
          },
          "identifier": "MergeExecution_0",
          "unmangled": {
            "name": "MergeExecution",
            "n": 0,
            "tag": ""
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L24",
                "index": 508,
                "children": []
              }
            },
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L41",
                "index": 873,
                "children": []
              }
            }
          ]
        },
        "1960": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L93",
            "index": 1960,
            "children": []
          },
          "identifier": "throttle_0Pure",
          "unmangled": {
            "name": "throttle",
            "n": 0,
            "tag": "Pure"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L96",
                "index": 2032,
                "children": []
              }
            }
          ]
        },
        "2021": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L96",
            "index": 2021,
            "children": []
          },
          "identifier": "a_0Input",
          "unmangled": {
            "name": "a",
            "n": 0,
            "tag": "Input"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L98",
                "index": 2102,
                "children": []
              }
            }
          ]
        },
        "2062": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L97",
            "index": 2062,
            "children": []
          },
          "identifier": "b_0Input",
          "unmangled": {
            "name": "b",
            "n": 0,
            "tag": "Input"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L98",
                "index": 2113,
                "children": []
              }
            }
          ]
        },
        "2090": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L98",
            "index": 2090,
            "children": []
          },
          "identifier": "sum_0Pure",
          "unmangled": {
            "name": "sum",
            "n": 0,
            "tag": "Pure"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L101",
                "index": 2186,
                "children": []
              }
            }
          ]
        },
        "2168": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L101",
            "index": 2168,
            "children": []
          },
          "identifier": "throttle_0Input",
          "unmangled": {
            "name": "throttle",
            "n": 0,
            "tag": "Input"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L102",
                "index": 2218,
                "children": []
              }
            }
          ]
        },
        "2293": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L109",
            "index": 2293,
            "children": []
          },
          "identifier": "MergeExecution_1",
          "unmangled": {
            "name": "MergeExecution",
            "n": 1,
            "tag": ""
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L28",
                "index": 593,
                "children": []
              }
            },
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L37",
                "index": 788,
                "children": []
              }
            }
          ]
        },
        "2350": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L112",
            "index": 2350,
            "children": []
          },
          "identifier": "throttle_0Pure",
          "unmangled": {
            "name": "throttle",
            "n": 0,
            "tag": "Pure"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L115",
                "index": 2423,
                "children": []
              }
            }
          ]
        },
        "2412": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L115",
            "index": 2412,
            "children": []
          },
          "identifier": "a_0Input",
          "unmangled": {
            "name": "a",
            "n": 0,
            "tag": "Input"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L117",
                "index": 2494,
                "children": []
              }
            }
          ]
        },
        "2453": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L116",
            "index": 2453,
            "children": []
          },
          "identifier": "b_0Input",
          "unmangled": {
            "name": "b",
            "n": 0,
            "tag": "Input"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L117",
                "index": 2505,
                "children": []
              }
            }
          ]
        },
        "2482": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L117",
            "index": 2482,
            "children": []
          },
          "identifier": "sum_0Pure",
          "unmangled": {
            "name": "sum",
            "n": 0,
            "tag": "Pure"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L120",
                "index": 2579,
                "children": []
              }
            }
          ]
        },
        "2561": {
          "type": "declaration",
          "item": {
            "tag": "declaration",
            "node": "L120",
            "index": 2561,
            "children": []
          },
          "identifier": "throttle_0Input",
          "unmangled": {
            "name": "throttle",
            "n": 0,
            "tag": "Input"
          },
          "references": [
            {
              "type": "reference",
              "item": {
                "tag": "reference",
                "node": "L121",
                "index": 2611,
                "children": []
              }
            }
          ]
        }
      },
      "references": {
        "508": 1904,
        "593": 2293,
        "788": 2293,
        "873": 1904,
        "1068": 1830,
        "1267": 1177,
        "1289": 1240,
        "1339": 1177,
        "1458": 333,
        "1534": 301,
        "1641": 1434,
        "1700": 1517,
        "1728": 1616,
        "1768": 1682,
        "1854": 1177,
        "1977": 301,
        "2032": 1960,
        "2102": 2021,
        "2113": 2062,
        "2186": 2090,
        "2205": 301,
        "2218": 2168,
        "2257": 1212,
        "2367": 301,
        "2423": 2350,
        "2494": 2412,
        "2505": 2453,
        "2579": 2482,
        "2598": 301,
        "2611": 2561,
        "2650": 1212
      },
      "stitches": [
        {
          "type": "stitch",
          "item": {
            "tag": "stitch",
            "node": "L19",
            "index": 357,
            "children": []
          },
          "key": "1 6",
          "startIndex": 357,
          "endIndex": 636,
          "inner": [
            {
              "type": "declaration",
              "item": {
                "tag": "declaration",
                "node": "L20",
                "index": 407,
                "children": []
              },
              "identifier": "keyboardEventSubscriber_0Internal",
              "unmangled": {
                "name": "keyboardEventSubscriber",
                "n": 0,
                "tag": "Internal"
              },
              "references": []
            },
            {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L23",
                "index": 483,
                "children": []
              },
              "key": "hidden 483",
              "startIndex": 483,
              "endIndex": 527,
              "inner": [
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L24",
                    "index": 508,
                    "children": []
                  }
                }
              ],
              "label": "Pressed"
            },
            {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L27",
                "index": 567,
                "children": []
              },
              "key": "hidden 567",
              "startIndex": 567,
              "endIndex": 612,
              "inner": [
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L28",
                    "index": 593,
                    "children": []
                  }
                }
              ],
              "label": "Released"
            }
          ],
          "coordinates": [
            1,
            6
          ],
          "label": "Keyboard \\"W\\"",
          "successor": {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L32",
              "index": 636,
              "children": []
            },
            "key": "1 11",
            "startIndex": 636,
            "endIndex": 916,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L33",
                  "index": 687,
                  "children": []
                },
                "identifier": "keyboardEventSubscriber_1Internal",
                "unmangled": {
                  "name": "keyboardEventSubscriber",
                  "n": 1,
                  "tag": "Internal"
                },
                "references": []
              },
              {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L36",
                  "index": 763,
                  "children": []
                },
                "key": "hidden 763",
                "startIndex": 763,
                "endIndex": 807,
                "inner": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L37",
                      "index": 788,
                      "children": []
                    }
                  }
                ],
                "label": "Pressed"
              },
              {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L40",
                  "index": 847,
                  "children": []
                },
                "key": "hidden 847",
                "startIndex": 847,
                "endIndex": 892,
                "inner": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L41",
                      "index": 873,
                      "children": []
                    }
                  }
                ],
                "label": "Released"
              }
            ],
            "coordinates": [
              1,
              11
            ],
            "label": "Keyboard \\"S\\"",
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L45",
                "index": 916,
                "children": []
              },
              "key": "3 19",
              "startIndex": 916,
              "endIndex": 1155,
              "inner": [
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L46",
                    "index": 967,
                    "children": []
                  },
                  "identifier": "keyboardEventSubscriber_2Internal",
                  "unmangled": {
                    "name": "keyboardEventSubscriber",
                    "n": 2,
                    "tag": "Internal"
                  },
                  "references": []
                },
                {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L49",
                    "index": 1043,
                    "children": []
                  },
                  "key": "hidden 1043",
                  "startIndex": 1043,
                  "endIndex": 1078,
                  "inner": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L50",
                        "index": 1068,
                        "children": []
                      }
                    }
                  ],
                  "label": "Pressed"
                },
                {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L53",
                    "index": 1118,
                    "children": []
                  },
                  "key": "hidden 1118",
                  "startIndex": 1118,
                  "endIndex": 1131,
                  "inner": [],
                  "label": "Released"
                }
              ],
              "coordinates": [
                3,
                19
              ],
              "label": "Keyboard \\"F\\"",
              "successor": {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L57",
                  "index": 1155,
                  "children": []
                },
                "key": "4 9",
                "startIndex": 1155,
                "endIndex": 1890,
                "inner": [
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L58",
                      "index": 1177,
                      "children": []
                    },
                    "identifier": "m_Counter_0Internal",
                    "unmangled": {
                      "name": "m_Counter",
                      "n": 0,
                      "tag": "Internal"
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L63",
                          "index": 1267,
                          "children": []
                        }
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L65",
                          "index": 1339,
                          "children": []
                        }
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L86",
                          "index": 1854,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L60",
                      "index": 1212,
                      "children": []
                    },
                    "identifier": "Enter_0",
                    "unmangled": {
                      "name": "Enter",
                      "n": 0,
                      "tag": ""
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L105",
                          "index": 2257,
                          "children": []
                        }
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L124",
                          "index": 2650,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L62",
                      "index": 1240,
                      "children": []
                    },
                    "identifier": "n_0Input",
                    "unmangled": {
                      "name": "n",
                      "n": 0,
                      "tag": "Input"
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L63",
                          "index": 1289,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L63",
                      "index": 1267,
                      "children": []
                    }
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L63",
                      "index": 1289,
                      "children": []
                    }
                  },
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L65",
                      "index": 1325,
                      "children": []
                    },
                    "identifier": "counter_0",
                    "unmangled": {
                      "name": "counter",
                      "n": 0,
                      "tag": ""
                    },
                    "references": []
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L65",
                      "index": 1339,
                      "children": []
                    }
                  },
                  {
                    "type": "stitch",
                    "item": {
                      "tag": "stitch",
                      "node": "L67",
                      "index": 1373,
                      "children": []
                    },
                    "key": "hidden 1373",
                    "startIndex": 1373,
                    "endIndex": 1396,
                    "inner": [],
                    "label": "Exit",
                    "successor": {
                      "type": "stitch",
                      "item": {
                        "tag": "stitch",
                        "node": "L69",
                        "index": 1396,
                        "children": []
                      },
                      "key": "4 1",
                      "startIndex": 1396,
                      "endIndex": 1490,
                      "inner": [
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L70",
                            "index": 1434,
                            "children": []
                          },
                          "identifier": "vehicleMovement_0Pure",
                          "unmangled": {
                            "name": "vehicleMovement",
                            "n": 0,
                            "tag": "Pure"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L76",
                                "index": 1641,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L70",
                            "index": 1458,
                            "children": []
                          }
                        }
                      ],
                      "coordinates": [
                        4,
                        1
                      ],
                      "successor": {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L72",
                          "index": 1490,
                          "children": []
                        },
                        "key": "4 4",
                        "startIndex": 1490,
                        "endIndex": 1559,
                        "inner": [
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L73",
                              "index": 1517,
                              "children": []
                            },
                            "identifier": "throttle_0Pure",
                            "unmangled": {
                              "name": "throttle",
                              "n": 0,
                              "tag": "Pure"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L77",
                                  "index": 1700,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L73",
                              "index": 1534,
                              "children": []
                            }
                          }
                        ],
                        "coordinates": [
                          4,
                          4
                        ],
                        "successor": {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L75",
                            "index": 1559,
                            "children": []
                          },
                          "key": "5 8",
                          "startIndex": 1559,
                          "endIndex": 1799,
                          "inner": [
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L76",
                                "index": 1616,
                                "children": []
                              },
                              "identifier": "vehicleMovement_0Input",
                              "unmangled": {
                                "name": "vehicleMovement",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L78",
                                    "index": 1728,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L76",
                                "index": 1641,
                                "children": []
                              }
                            },
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L77",
                                "index": 1682,
                                "children": []
                              },
                              "identifier": "throttle_0Input",
                              "unmangled": {
                                "name": "throttle",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L78",
                                    "index": 1768,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L77",
                                "index": 1700,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L78",
                                "index": 1728,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L78",
                                "index": 1768,
                                "children": []
                              }
                            }
                          ],
                          "coordinates": [
                            5,
                            8
                          ],
                          "label": "Set Throttle Input",
                          "successor": {
                            "type": "stitch",
                            "item": {
                              "tag": "stitch",
                              "node": "L80",
                              "index": 1799,
                              "children": []
                            },
                            "key": "hidden 1799",
                            "startIndex": 1799,
                            "endIndex": 1803,
                            "inner": []
                          }
                        }
                      }
                    }
                  },
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L84",
                      "index": 1830,
                      "children": []
                    },
                    "identifier": "Reset_0",
                    "unmangled": {
                      "name": "Reset",
                      "n": 0,
                      "tag": ""
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L50",
                          "index": 1068,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L86",
                      "index": 1854,
                      "children": []
                    }
                  }
                ],
                "coordinates": [
                  4,
                  9
                ],
                "label": "Do N",
                "successor": {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L89",
                    "index": 1890,
                    "children": []
                  },
                  "key": "hidden 1890",
                  "startIndex": 1890,
                  "endIndex": 2279,
                  "inner": [
                    {
                      "type": "declaration",
                      "item": {
                        "tag": "declaration",
                        "node": "L90",
                        "index": 1904,
                        "children": []
                      },
                      "identifier": "MergeExecution_0",
                      "unmangled": {
                        "name": "MergeExecution",
                        "n": 0,
                        "tag": ""
                      },
                      "references": [
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L24",
                            "index": 508,
                            "children": []
                          }
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L41",
                            "index": 873,
                            "children": []
                          }
                        }
                      ]
                    },
                    {
                      "type": "stitch",
                      "item": {
                        "tag": "stitch",
                        "node": "L92",
                        "index": 1937,
                        "children": []
                      },
                      "key": "1 1",
                      "startIndex": 1937,
                      "endIndex": 1998,
                      "inner": [
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L93",
                            "index": 1960,
                            "children": []
                          },
                          "identifier": "throttle_0Pure",
                          "unmangled": {
                            "name": "throttle",
                            "n": 0,
                            "tag": "Pure"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L96",
                                "index": 2032,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L93",
                            "index": 1977,
                            "children": []
                          }
                        }
                      ],
                      "coordinates": [
                        1,
                        1
                      ],
                      "successor": {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L95",
                          "index": 1998,
                          "children": []
                        },
                        "key": "2 1",
                        "startIndex": 1998,
                        "endIndex": 2132,
                        "inner": [
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L96",
                              "index": 2021,
                              "children": []
                            },
                            "identifier": "a_0Input",
                            "unmangled": {
                              "name": "a",
                              "n": 0,
                              "tag": "Input"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L98",
                                  "index": 2102,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L96",
                              "index": 2032,
                              "children": []
                            }
                          },
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L97",
                              "index": 2062,
                              "children": []
                            },
                            "identifier": "b_0Input",
                            "unmangled": {
                              "name": "b",
                              "n": 0,
                              "tag": "Input"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L98",
                                  "index": 2113,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L98",
                              "index": 2090,
                              "children": []
                            },
                            "identifier": "sum_0Pure",
                            "unmangled": {
                              "name": "sum",
                              "n": 0,
                              "tag": "Pure"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L101",
                                  "index": 2186,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L98",
                              "index": 2102,
                              "children": []
                            }
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L98",
                              "index": 2113,
                              "children": []
                            }
                          }
                        ],
                        "coordinates": [
                          2,
                          1
                        ],
                        "successor": {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L100",
                            "index": 2132,
                            "children": []
                          },
                          "key": "3 6",
                          "startIndex": 2132,
                          "endIndex": 2244,
                          "inner": [
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L101",
                                "index": 2168,
                                "children": []
                              },
                              "identifier": "throttle_0Input",
                              "unmangled": {
                                "name": "throttle",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L102",
                                    "index": 2218,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L101",
                                "index": 2186,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L102",
                                "index": 2205,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L102",
                                "index": 2218,
                                "children": []
                              }
                            }
                          ],
                          "coordinates": [
                            3,
                            6
                          ],
                          "label": "Set Throttle",
                          "successor": {
                            "type": "stitch",
                            "item": {
                              "tag": "stitch",
                              "node": "L104",
                              "index": 2244,
                              "children": []
                            },
                            "key": "hidden 2244",
                            "startIndex": 2244,
                            "endIndex": 2267,
                            "inner": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L105",
                                  "index": 2257,
                                  "children": []
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  ],
                  "successor": {
                    "type": "stitch",
                    "item": {
                      "tag": "stitch",
                      "node": "L108",
                      "index": 2279,
                      "children": []
                    },
                    "key": "hidden 2279",
                    "startIndex": 2279,
                    "endIndex": 2666,
                    "inner": [
                      {
                        "type": "declaration",
                        "item": {
                          "tag": "declaration",
                          "node": "L109",
                          "index": 2293,
                          "children": []
                        },
                        "identifier": "MergeExecution_1",
                        "unmangled": {
                          "name": "MergeExecution",
                          "n": 1,
                          "tag": ""
                        },
                        "references": [
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L28",
                              "index": 593,
                              "children": []
                            }
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L37",
                              "index": 788,
                              "children": []
                            }
                          }
                        ]
                      },
                      {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L111",
                          "index": 2326,
                          "children": []
                        },
                        "key": "1 17",
                        "startIndex": 2326,
                        "endIndex": 2388,
                        "inner": [
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L112",
                              "index": 2350,
                              "children": []
                            },
                            "identifier": "throttle_0Pure",
                            "unmangled": {
                              "name": "throttle",
                              "n": 0,
                              "tag": "Pure"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L115",
                                  "index": 2423,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L112",
                              "index": 2367,
                              "children": []
                            }
                          }
                        ],
                        "coordinates": [
                          1,
                          17
                        ],
                        "successor": {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L114",
                            "index": 2388,
                            "children": []
                          },
                          "key": "2 17",
                          "startIndex": 2388,
                          "endIndex": 2524,
                          "inner": [
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L115",
                                "index": 2412,
                                "children": []
                              },
                              "identifier": "a_0Input",
                              "unmangled": {
                                "name": "a",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L117",
                                    "index": 2494,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L115",
                                "index": 2423,
                                "children": []
                              }
                            },
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L116",
                                "index": 2453,
                                "children": []
                              },
                              "identifier": "b_0Input",
                              "unmangled": {
                                "name": "b",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L117",
                                    "index": 2505,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L117",
                                "index": 2482,
                                "children": []
                              },
                              "identifier": "sum_0Pure",
                              "unmangled": {
                                "name": "sum",
                                "n": 0,
                                "tag": "Pure"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L120",
                                    "index": 2579,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L117",
                                "index": 2494,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L117",
                                "index": 2505,
                                "children": []
                              }
                            }
                          ],
                          "coordinates": [
                            2,
                            17
                          ],
                          "successor": {
                            "type": "stitch",
                            "item": {
                              "tag": "stitch",
                              "node": "L119",
                              "index": 2524,
                              "children": []
                            },
                            "key": "3 11",
                            "startIndex": 2524,
                            "endIndex": 2637,
                            "inner": [
                              {
                                "type": "declaration",
                                "item": {
                                  "tag": "declaration",
                                  "node": "L120",
                                  "index": 2561,
                                  "children": []
                                },
                                "identifier": "throttle_0Input",
                                "unmangled": {
                                  "name": "throttle",
                                  "n": 0,
                                  "tag": "Input"
                                },
                                "references": [
                                  {
                                    "type": "reference",
                                    "item": {
                                      "tag": "reference",
                                      "node": "L121",
                                      "index": 2611,
                                      "children": []
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L120",
                                  "index": 2579,
                                  "children": []
                                }
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L121",
                                  "index": 2598,
                                  "children": []
                                }
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L121",
                                  "index": 2611,
                                  "children": []
                                }
                              }
                            ],
                            "coordinates": [
                              3,
                              11
                            ],
                            "label": "Set Throttle",
                            "successor": {
                              "type": "stitch",
                              "item": {
                                "tag": "stitch",
                                "node": "L123",
                                "index": 2637,
                                "children": []
                              },
                              "key": "hidden 2637",
                              "startIndex": 2637,
                              "endIndex": 2660,
                              "inner": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L124",
                                    "index": 2650,
                                    "children": []
                                  }
                                }
                              ]
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      ],
      "stitchIndex": {
        "1 6": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L19",
              "index": 357,
              "children": []
            },
            "key": "1 6",
            "startIndex": 357,
            "endIndex": 636,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L20",
                  "index": 407,
                  "children": []
                },
                "identifier": "keyboardEventSubscriber_0Internal",
                "unmangled": {
                  "name": "keyboardEventSubscriber",
                  "n": 0,
                  "tag": "Internal"
                },
                "references": []
              },
              {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L23",
                  "index": 483,
                  "children": []
                },
                "key": "hidden 483",
                "startIndex": 483,
                "endIndex": 527,
                "inner": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L24",
                      "index": 508,
                      "children": []
                    }
                  }
                ],
                "label": "Pressed"
              },
              {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L27",
                  "index": 567,
                  "children": []
                },
                "key": "hidden 567",
                "startIndex": 567,
                "endIndex": 612,
                "inner": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L28",
                      "index": 593,
                      "children": []
                    }
                  }
                ],
                "label": "Released"
              }
            ],
            "coordinates": [
              1,
              6
            ],
            "label": "Keyboard \\"W\\"",
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L32",
                "index": 636,
                "children": []
              },
              "key": "1 11",
              "startIndex": 636,
              "endIndex": 916,
              "inner": [
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L33",
                    "index": 687,
                    "children": []
                  },
                  "identifier": "keyboardEventSubscriber_1Internal",
                  "unmangled": {
                    "name": "keyboardEventSubscriber",
                    "n": 1,
                    "tag": "Internal"
                  },
                  "references": []
                },
                {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L36",
                    "index": 763,
                    "children": []
                  },
                  "key": "hidden 763",
                  "startIndex": 763,
                  "endIndex": 807,
                  "inner": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L37",
                        "index": 788,
                        "children": []
                      }
                    }
                  ],
                  "label": "Pressed"
                },
                {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L40",
                    "index": 847,
                    "children": []
                  },
                  "key": "hidden 847",
                  "startIndex": 847,
                  "endIndex": 892,
                  "inner": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L41",
                        "index": 873,
                        "children": []
                      }
                    }
                  ],
                  "label": "Released"
                }
              ],
              "coordinates": [
                1,
                11
              ],
              "label": "Keyboard \\"S\\"",
              "successor": {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L45",
                  "index": 916,
                  "children": []
                },
                "key": "3 19",
                "startIndex": 916,
                "endIndex": 1155,
                "inner": [
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L46",
                      "index": 967,
                      "children": []
                    },
                    "identifier": "keyboardEventSubscriber_2Internal",
                    "unmangled": {
                      "name": "keyboardEventSubscriber",
                      "n": 2,
                      "tag": "Internal"
                    },
                    "references": []
                  },
                  {
                    "type": "stitch",
                    "item": {
                      "tag": "stitch",
                      "node": "L49",
                      "index": 1043,
                      "children": []
                    },
                    "key": "hidden 1043",
                    "startIndex": 1043,
                    "endIndex": 1078,
                    "inner": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L50",
                          "index": 1068,
                          "children": []
                        }
                      }
                    ],
                    "label": "Pressed"
                  },
                  {
                    "type": "stitch",
                    "item": {
                      "tag": "stitch",
                      "node": "L53",
                      "index": 1118,
                      "children": []
                    },
                    "key": "hidden 1118",
                    "startIndex": 1118,
                    "endIndex": 1131,
                    "inner": [],
                    "label": "Released"
                  }
                ],
                "coordinates": [
                  3,
                  19
                ],
                "label": "Keyboard \\"F\\"",
                "successor": {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L57",
                    "index": 1155,
                    "children": []
                  },
                  "key": "4 9",
                  "startIndex": 1155,
                  "endIndex": 1890,
                  "inner": [
                    {
                      "type": "declaration",
                      "item": {
                        "tag": "declaration",
                        "node": "L58",
                        "index": 1177,
                        "children": []
                      },
                      "identifier": "m_Counter_0Internal",
                      "unmangled": {
                        "name": "m_Counter",
                        "n": 0,
                        "tag": "Internal"
                      },
                      "references": [
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L63",
                            "index": 1267,
                            "children": []
                          }
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L65",
                            "index": 1339,
                            "children": []
                          }
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L86",
                            "index": 1854,
                            "children": []
                          }
                        }
                      ]
                    },
                    {
                      "type": "declaration",
                      "item": {
                        "tag": "declaration",
                        "node": "L60",
                        "index": 1212,
                        "children": []
                      },
                      "identifier": "Enter_0",
                      "unmangled": {
                        "name": "Enter",
                        "n": 0,
                        "tag": ""
                      },
                      "references": [
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L105",
                            "index": 2257,
                            "children": []
                          }
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L124",
                            "index": 2650,
                            "children": []
                          }
                        }
                      ]
                    },
                    {
                      "type": "declaration",
                      "item": {
                        "tag": "declaration",
                        "node": "L62",
                        "index": 1240,
                        "children": []
                      },
                      "identifier": "n_0Input",
                      "unmangled": {
                        "name": "n",
                        "n": 0,
                        "tag": "Input"
                      },
                      "references": [
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L63",
                            "index": 1289,
                            "children": []
                          }
                        }
                      ]
                    },
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L63",
                        "index": 1267,
                        "children": []
                      }
                    },
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L63",
                        "index": 1289,
                        "children": []
                      }
                    },
                    {
                      "type": "declaration",
                      "item": {
                        "tag": "declaration",
                        "node": "L65",
                        "index": 1325,
                        "children": []
                      },
                      "identifier": "counter_0",
                      "unmangled": {
                        "name": "counter",
                        "n": 0,
                        "tag": ""
                      },
                      "references": []
                    },
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L65",
                        "index": 1339,
                        "children": []
                      }
                    },
                    {
                      "type": "stitch",
                      "item": {
                        "tag": "stitch",
                        "node": "L67",
                        "index": 1373,
                        "children": []
                      },
                      "key": "hidden 1373",
                      "startIndex": 1373,
                      "endIndex": 1396,
                      "inner": [],
                      "label": "Exit",
                      "successor": {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L69",
                          "index": 1396,
                          "children": []
                        },
                        "key": "4 1",
                        "startIndex": 1396,
                        "endIndex": 1490,
                        "inner": [
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L70",
                              "index": 1434,
                              "children": []
                            },
                            "identifier": "vehicleMovement_0Pure",
                            "unmangled": {
                              "name": "vehicleMovement",
                              "n": 0,
                              "tag": "Pure"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L76",
                                  "index": 1641,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L70",
                              "index": 1458,
                              "children": []
                            }
                          }
                        ],
                        "coordinates": [
                          4,
                          1
                        ],
                        "successor": {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L72",
                            "index": 1490,
                            "children": []
                          },
                          "key": "4 4",
                          "startIndex": 1490,
                          "endIndex": 1559,
                          "inner": [
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L73",
                                "index": 1517,
                                "children": []
                              },
                              "identifier": "throttle_0Pure",
                              "unmangled": {
                                "name": "throttle",
                                "n": 0,
                                "tag": "Pure"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L77",
                                    "index": 1700,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L73",
                                "index": 1534,
                                "children": []
                              }
                            }
                          ],
                          "coordinates": [
                            4,
                            4
                          ],
                          "successor": {
                            "type": "stitch",
                            "item": {
                              "tag": "stitch",
                              "node": "L75",
                              "index": 1559,
                              "children": []
                            },
                            "key": "5 8",
                            "startIndex": 1559,
                            "endIndex": 1799,
                            "inner": [
                              {
                                "type": "declaration",
                                "item": {
                                  "tag": "declaration",
                                  "node": "L76",
                                  "index": 1616,
                                  "children": []
                                },
                                "identifier": "vehicleMovement_0Input",
                                "unmangled": {
                                  "name": "vehicleMovement",
                                  "n": 0,
                                  "tag": "Input"
                                },
                                "references": [
                                  {
                                    "type": "reference",
                                    "item": {
                                      "tag": "reference",
                                      "node": "L78",
                                      "index": 1728,
                                      "children": []
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L76",
                                  "index": 1641,
                                  "children": []
                                }
                              },
                              {
                                "type": "declaration",
                                "item": {
                                  "tag": "declaration",
                                  "node": "L77",
                                  "index": 1682,
                                  "children": []
                                },
                                "identifier": "throttle_0Input",
                                "unmangled": {
                                  "name": "throttle",
                                  "n": 0,
                                  "tag": "Input"
                                },
                                "references": [
                                  {
                                    "type": "reference",
                                    "item": {
                                      "tag": "reference",
                                      "node": "L78",
                                      "index": 1768,
                                      "children": []
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L77",
                                  "index": 1700,
                                  "children": []
                                }
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L78",
                                  "index": 1728,
                                  "children": []
                                }
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L78",
                                  "index": 1768,
                                  "children": []
                                }
                              }
                            ],
                            "coordinates": [
                              5,
                              8
                            ],
                            "label": "Set Throttle Input",
                            "successor": {
                              "type": "stitch",
                              "item": {
                                "tag": "stitch",
                                "node": "L80",
                                "index": 1799,
                                "children": []
                              },
                              "key": "hidden 1799",
                              "startIndex": 1799,
                              "endIndex": 1803,
                              "inner": []
                            }
                          }
                        }
                      }
                    },
                    {
                      "type": "declaration",
                      "item": {
                        "tag": "declaration",
                        "node": "L84",
                        "index": 1830,
                        "children": []
                      },
                      "identifier": "Reset_0",
                      "unmangled": {
                        "name": "Reset",
                        "n": 0,
                        "tag": ""
                      },
                      "references": [
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L50",
                            "index": 1068,
                            "children": []
                          }
                        }
                      ]
                    },
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L86",
                        "index": 1854,
                        "children": []
                      }
                    }
                  ],
                  "coordinates": [
                    4,
                    9
                  ],
                  "label": "Do N",
                  "successor": {
                    "type": "stitch",
                    "item": {
                      "tag": "stitch",
                      "node": "L89",
                      "index": 1890,
                      "children": []
                    },
                    "key": "hidden 1890",
                    "startIndex": 1890,
                    "endIndex": 2279,
                    "inner": [
                      {
                        "type": "declaration",
                        "item": {
                          "tag": "declaration",
                          "node": "L90",
                          "index": 1904,
                          "children": []
                        },
                        "identifier": "MergeExecution_0",
                        "unmangled": {
                          "name": "MergeExecution",
                          "n": 0,
                          "tag": ""
                        },
                        "references": [
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L24",
                              "index": 508,
                              "children": []
                            }
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L41",
                              "index": 873,
                              "children": []
                            }
                          }
                        ]
                      },
                      {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L92",
                          "index": 1937,
                          "children": []
                        },
                        "key": "1 1",
                        "startIndex": 1937,
                        "endIndex": 1998,
                        "inner": [
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L93",
                              "index": 1960,
                              "children": []
                            },
                            "identifier": "throttle_0Pure",
                            "unmangled": {
                              "name": "throttle",
                              "n": 0,
                              "tag": "Pure"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L96",
                                  "index": 2032,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L93",
                              "index": 1977,
                              "children": []
                            }
                          }
                        ],
                        "coordinates": [
                          1,
                          1
                        ],
                        "successor": {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L95",
                            "index": 1998,
                            "children": []
                          },
                          "key": "2 1",
                          "startIndex": 1998,
                          "endIndex": 2132,
                          "inner": [
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L96",
                                "index": 2021,
                                "children": []
                              },
                              "identifier": "a_0Input",
                              "unmangled": {
                                "name": "a",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L98",
                                    "index": 2102,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L96",
                                "index": 2032,
                                "children": []
                              }
                            },
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L97",
                                "index": 2062,
                                "children": []
                              },
                              "identifier": "b_0Input",
                              "unmangled": {
                                "name": "b",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L98",
                                    "index": 2113,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L98",
                                "index": 2090,
                                "children": []
                              },
                              "identifier": "sum_0Pure",
                              "unmangled": {
                                "name": "sum",
                                "n": 0,
                                "tag": "Pure"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L101",
                                    "index": 2186,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L98",
                                "index": 2102,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L98",
                                "index": 2113,
                                "children": []
                              }
                            }
                          ],
                          "coordinates": [
                            2,
                            1
                          ],
                          "successor": {
                            "type": "stitch",
                            "item": {
                              "tag": "stitch",
                              "node": "L100",
                              "index": 2132,
                              "children": []
                            },
                            "key": "3 6",
                            "startIndex": 2132,
                            "endIndex": 2244,
                            "inner": [
                              {
                                "type": "declaration",
                                "item": {
                                  "tag": "declaration",
                                  "node": "L101",
                                  "index": 2168,
                                  "children": []
                                },
                                "identifier": "throttle_0Input",
                                "unmangled": {
                                  "name": "throttle",
                                  "n": 0,
                                  "tag": "Input"
                                },
                                "references": [
                                  {
                                    "type": "reference",
                                    "item": {
                                      "tag": "reference",
                                      "node": "L102",
                                      "index": 2218,
                                      "children": []
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L101",
                                  "index": 2186,
                                  "children": []
                                }
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L102",
                                  "index": 2205,
                                  "children": []
                                }
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L102",
                                  "index": 2218,
                                  "children": []
                                }
                              }
                            ],
                            "coordinates": [
                              3,
                              6
                            ],
                            "label": "Set Throttle",
                            "successor": {
                              "type": "stitch",
                              "item": {
                                "tag": "stitch",
                                "node": "L104",
                                "index": 2244,
                                "children": []
                              },
                              "key": "hidden 2244",
                              "startIndex": 2244,
                              "endIndex": 2267,
                              "inner": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L105",
                                    "index": 2257,
                                    "children": []
                                  }
                                }
                              ]
                            }
                          }
                        }
                      }
                    ],
                    "successor": {
                      "type": "stitch",
                      "item": {
                        "tag": "stitch",
                        "node": "L108",
                        "index": 2279,
                        "children": []
                      },
                      "key": "hidden 2279",
                      "startIndex": 2279,
                      "endIndex": 2666,
                      "inner": [
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L109",
                            "index": 2293,
                            "children": []
                          },
                          "identifier": "MergeExecution_1",
                          "unmangled": {
                            "name": "MergeExecution",
                            "n": 1,
                            "tag": ""
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L28",
                                "index": 593,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L37",
                                "index": 788,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L111",
                            "index": 2326,
                            "children": []
                          },
                          "key": "1 17",
                          "startIndex": 2326,
                          "endIndex": 2388,
                          "inner": [
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L112",
                                "index": 2350,
                                "children": []
                              },
                              "identifier": "throttle_0Pure",
                              "unmangled": {
                                "name": "throttle",
                                "n": 0,
                                "tag": "Pure"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L115",
                                    "index": 2423,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L112",
                                "index": 2367,
                                "children": []
                              }
                            }
                          ],
                          "coordinates": [
                            1,
                            17
                          ],
                          "successor": {
                            "type": "stitch",
                            "item": {
                              "tag": "stitch",
                              "node": "L114",
                              "index": 2388,
                              "children": []
                            },
                            "key": "2 17",
                            "startIndex": 2388,
                            "endIndex": 2524,
                            "inner": [
                              {
                                "type": "declaration",
                                "item": {
                                  "tag": "declaration",
                                  "node": "L115",
                                  "index": 2412,
                                  "children": []
                                },
                                "identifier": "a_0Input",
                                "unmangled": {
                                  "name": "a",
                                  "n": 0,
                                  "tag": "Input"
                                },
                                "references": [
                                  {
                                    "type": "reference",
                                    "item": {
                                      "tag": "reference",
                                      "node": "L117",
                                      "index": 2494,
                                      "children": []
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L115",
                                  "index": 2423,
                                  "children": []
                                }
                              },
                              {
                                "type": "declaration",
                                "item": {
                                  "tag": "declaration",
                                  "node": "L116",
                                  "index": 2453,
                                  "children": []
                                },
                                "identifier": "b_0Input",
                                "unmangled": {
                                  "name": "b",
                                  "n": 0,
                                  "tag": "Input"
                                },
                                "references": [
                                  {
                                    "type": "reference",
                                    "item": {
                                      "tag": "reference",
                                      "node": "L117",
                                      "index": 2505,
                                      "children": []
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "declaration",
                                "item": {
                                  "tag": "declaration",
                                  "node": "L117",
                                  "index": 2482,
                                  "children": []
                                },
                                "identifier": "sum_0Pure",
                                "unmangled": {
                                  "name": "sum",
                                  "n": 0,
                                  "tag": "Pure"
                                },
                                "references": [
                                  {
                                    "type": "reference",
                                    "item": {
                                      "tag": "reference",
                                      "node": "L120",
                                      "index": 2579,
                                      "children": []
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L117",
                                  "index": 2494,
                                  "children": []
                                }
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L117",
                                  "index": 2505,
                                  "children": []
                                }
                              }
                            ],
                            "coordinates": [
                              2,
                              17
                            ],
                            "successor": {
                              "type": "stitch",
                              "item": {
                                "tag": "stitch",
                                "node": "L119",
                                "index": 2524,
                                "children": []
                              },
                              "key": "3 11",
                              "startIndex": 2524,
                              "endIndex": 2637,
                              "inner": [
                                {
                                  "type": "declaration",
                                  "item": {
                                    "tag": "declaration",
                                    "node": "L120",
                                    "index": 2561,
                                    "children": []
                                  },
                                  "identifier": "throttle_0Input",
                                  "unmangled": {
                                    "name": "throttle",
                                    "n": 0,
                                    "tag": "Input"
                                  },
                                  "references": [
                                    {
                                      "type": "reference",
                                      "item": {
                                        "tag": "reference",
                                        "node": "L121",
                                        "index": 2611,
                                        "children": []
                                      }
                                    }
                                  ]
                                },
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L120",
                                    "index": 2579,
                                    "children": []
                                  }
                                },
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L121",
                                    "index": 2598,
                                    "children": []
                                  }
                                },
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L121",
                                    "index": 2611,
                                    "children": []
                                  }
                                }
                              ],
                              "coordinates": [
                                3,
                                11
                              ],
                              "label": "Set Throttle",
                              "successor": {
                                "type": "stitch",
                                "item": {
                                  "tag": "stitch",
                                  "node": "L123",
                                  "index": 2637,
                                  "children": []
                                },
                                "key": "hidden 2637",
                                "startIndex": 2637,
                                "endIndex": 2660,
                                "inner": [
                                  {
                                    "type": "reference",
                                    "item": {
                                      "tag": "reference",
                                      "node": "L124",
                                      "index": 2650,
                                      "children": []
                                    }
                                  }
                                ]
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        ],
        "1 11": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L32",
              "index": 636,
              "children": []
            },
            "key": "1 11",
            "startIndex": 636,
            "endIndex": 916,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L33",
                  "index": 687,
                  "children": []
                },
                "identifier": "keyboardEventSubscriber_1Internal",
                "unmangled": {
                  "name": "keyboardEventSubscriber",
                  "n": 1,
                  "tag": "Internal"
                },
                "references": []
              },
              {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L36",
                  "index": 763,
                  "children": []
                },
                "key": "hidden 763",
                "startIndex": 763,
                "endIndex": 807,
                "inner": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L37",
                      "index": 788,
                      "children": []
                    }
                  }
                ],
                "label": "Pressed"
              },
              {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L40",
                  "index": 847,
                  "children": []
                },
                "key": "hidden 847",
                "startIndex": 847,
                "endIndex": 892,
                "inner": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L41",
                      "index": 873,
                      "children": []
                    }
                  }
                ],
                "label": "Released"
              }
            ],
            "coordinates": [
              1,
              11
            ],
            "label": "Keyboard \\"S\\"",
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L45",
                "index": 916,
                "children": []
              },
              "key": "3 19",
              "startIndex": 916,
              "endIndex": 1155,
              "inner": [
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L46",
                    "index": 967,
                    "children": []
                  },
                  "identifier": "keyboardEventSubscriber_2Internal",
                  "unmangled": {
                    "name": "keyboardEventSubscriber",
                    "n": 2,
                    "tag": "Internal"
                  },
                  "references": []
                },
                {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L49",
                    "index": 1043,
                    "children": []
                  },
                  "key": "hidden 1043",
                  "startIndex": 1043,
                  "endIndex": 1078,
                  "inner": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L50",
                        "index": 1068,
                        "children": []
                      }
                    }
                  ],
                  "label": "Pressed"
                },
                {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L53",
                    "index": 1118,
                    "children": []
                  },
                  "key": "hidden 1118",
                  "startIndex": 1118,
                  "endIndex": 1131,
                  "inner": [],
                  "label": "Released"
                }
              ],
              "coordinates": [
                3,
                19
              ],
              "label": "Keyboard \\"F\\"",
              "successor": {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L57",
                  "index": 1155,
                  "children": []
                },
                "key": "4 9",
                "startIndex": 1155,
                "endIndex": 1890,
                "inner": [
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L58",
                      "index": 1177,
                      "children": []
                    },
                    "identifier": "m_Counter_0Internal",
                    "unmangled": {
                      "name": "m_Counter",
                      "n": 0,
                      "tag": "Internal"
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L63",
                          "index": 1267,
                          "children": []
                        }
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L65",
                          "index": 1339,
                          "children": []
                        }
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L86",
                          "index": 1854,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L60",
                      "index": 1212,
                      "children": []
                    },
                    "identifier": "Enter_0",
                    "unmangled": {
                      "name": "Enter",
                      "n": 0,
                      "tag": ""
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L105",
                          "index": 2257,
                          "children": []
                        }
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L124",
                          "index": 2650,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L62",
                      "index": 1240,
                      "children": []
                    },
                    "identifier": "n_0Input",
                    "unmangled": {
                      "name": "n",
                      "n": 0,
                      "tag": "Input"
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L63",
                          "index": 1289,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L63",
                      "index": 1267,
                      "children": []
                    }
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L63",
                      "index": 1289,
                      "children": []
                    }
                  },
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L65",
                      "index": 1325,
                      "children": []
                    },
                    "identifier": "counter_0",
                    "unmangled": {
                      "name": "counter",
                      "n": 0,
                      "tag": ""
                    },
                    "references": []
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L65",
                      "index": 1339,
                      "children": []
                    }
                  },
                  {
                    "type": "stitch",
                    "item": {
                      "tag": "stitch",
                      "node": "L67",
                      "index": 1373,
                      "children": []
                    },
                    "key": "hidden 1373",
                    "startIndex": 1373,
                    "endIndex": 1396,
                    "inner": [],
                    "label": "Exit",
                    "successor": {
                      "type": "stitch",
                      "item": {
                        "tag": "stitch",
                        "node": "L69",
                        "index": 1396,
                        "children": []
                      },
                      "key": "4 1",
                      "startIndex": 1396,
                      "endIndex": 1490,
                      "inner": [
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L70",
                            "index": 1434,
                            "children": []
                          },
                          "identifier": "vehicleMovement_0Pure",
                          "unmangled": {
                            "name": "vehicleMovement",
                            "n": 0,
                            "tag": "Pure"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L76",
                                "index": 1641,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L70",
                            "index": 1458,
                            "children": []
                          }
                        }
                      ],
                      "coordinates": [
                        4,
                        1
                      ],
                      "successor": {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L72",
                          "index": 1490,
                          "children": []
                        },
                        "key": "4 4",
                        "startIndex": 1490,
                        "endIndex": 1559,
                        "inner": [
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L73",
                              "index": 1517,
                              "children": []
                            },
                            "identifier": "throttle_0Pure",
                            "unmangled": {
                              "name": "throttle",
                              "n": 0,
                              "tag": "Pure"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L77",
                                  "index": 1700,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L73",
                              "index": 1534,
                              "children": []
                            }
                          }
                        ],
                        "coordinates": [
                          4,
                          4
                        ],
                        "successor": {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L75",
                            "index": 1559,
                            "children": []
                          },
                          "key": "5 8",
                          "startIndex": 1559,
                          "endIndex": 1799,
                          "inner": [
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L76",
                                "index": 1616,
                                "children": []
                              },
                              "identifier": "vehicleMovement_0Input",
                              "unmangled": {
                                "name": "vehicleMovement",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L78",
                                    "index": 1728,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L76",
                                "index": 1641,
                                "children": []
                              }
                            },
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L77",
                                "index": 1682,
                                "children": []
                              },
                              "identifier": "throttle_0Input",
                              "unmangled": {
                                "name": "throttle",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L78",
                                    "index": 1768,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L77",
                                "index": 1700,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L78",
                                "index": 1728,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L78",
                                "index": 1768,
                                "children": []
                              }
                            }
                          ],
                          "coordinates": [
                            5,
                            8
                          ],
                          "label": "Set Throttle Input",
                          "successor": {
                            "type": "stitch",
                            "item": {
                              "tag": "stitch",
                              "node": "L80",
                              "index": 1799,
                              "children": []
                            },
                            "key": "hidden 1799",
                            "startIndex": 1799,
                            "endIndex": 1803,
                            "inner": []
                          }
                        }
                      }
                    }
                  },
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L84",
                      "index": 1830,
                      "children": []
                    },
                    "identifier": "Reset_0",
                    "unmangled": {
                      "name": "Reset",
                      "n": 0,
                      "tag": ""
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L50",
                          "index": 1068,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L86",
                      "index": 1854,
                      "children": []
                    }
                  }
                ],
                "coordinates": [
                  4,
                  9
                ],
                "label": "Do N",
                "successor": {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L89",
                    "index": 1890,
                    "children": []
                  },
                  "key": "hidden 1890",
                  "startIndex": 1890,
                  "endIndex": 2279,
                  "inner": [
                    {
                      "type": "declaration",
                      "item": {
                        "tag": "declaration",
                        "node": "L90",
                        "index": 1904,
                        "children": []
                      },
                      "identifier": "MergeExecution_0",
                      "unmangled": {
                        "name": "MergeExecution",
                        "n": 0,
                        "tag": ""
                      },
                      "references": [
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L24",
                            "index": 508,
                            "children": []
                          }
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L41",
                            "index": 873,
                            "children": []
                          }
                        }
                      ]
                    },
                    {
                      "type": "stitch",
                      "item": {
                        "tag": "stitch",
                        "node": "L92",
                        "index": 1937,
                        "children": []
                      },
                      "key": "1 1",
                      "startIndex": 1937,
                      "endIndex": 1998,
                      "inner": [
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L93",
                            "index": 1960,
                            "children": []
                          },
                          "identifier": "throttle_0Pure",
                          "unmangled": {
                            "name": "throttle",
                            "n": 0,
                            "tag": "Pure"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L96",
                                "index": 2032,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L93",
                            "index": 1977,
                            "children": []
                          }
                        }
                      ],
                      "coordinates": [
                        1,
                        1
                      ],
                      "successor": {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L95",
                          "index": 1998,
                          "children": []
                        },
                        "key": "2 1",
                        "startIndex": 1998,
                        "endIndex": 2132,
                        "inner": [
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L96",
                              "index": 2021,
                              "children": []
                            },
                            "identifier": "a_0Input",
                            "unmangled": {
                              "name": "a",
                              "n": 0,
                              "tag": "Input"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L98",
                                  "index": 2102,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L96",
                              "index": 2032,
                              "children": []
                            }
                          },
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L97",
                              "index": 2062,
                              "children": []
                            },
                            "identifier": "b_0Input",
                            "unmangled": {
                              "name": "b",
                              "n": 0,
                              "tag": "Input"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L98",
                                  "index": 2113,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L98",
                              "index": 2090,
                              "children": []
                            },
                            "identifier": "sum_0Pure",
                            "unmangled": {
                              "name": "sum",
                              "n": 0,
                              "tag": "Pure"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L101",
                                  "index": 2186,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L98",
                              "index": 2102,
                              "children": []
                            }
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L98",
                              "index": 2113,
                              "children": []
                            }
                          }
                        ],
                        "coordinates": [
                          2,
                          1
                        ],
                        "successor": {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L100",
                            "index": 2132,
                            "children": []
                          },
                          "key": "3 6",
                          "startIndex": 2132,
                          "endIndex": 2244,
                          "inner": [
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L101",
                                "index": 2168,
                                "children": []
                              },
                              "identifier": "throttle_0Input",
                              "unmangled": {
                                "name": "throttle",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L102",
                                    "index": 2218,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L101",
                                "index": 2186,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L102",
                                "index": 2205,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L102",
                                "index": 2218,
                                "children": []
                              }
                            }
                          ],
                          "coordinates": [
                            3,
                            6
                          ],
                          "label": "Set Throttle",
                          "successor": {
                            "type": "stitch",
                            "item": {
                              "tag": "stitch",
                              "node": "L104",
                              "index": 2244,
                              "children": []
                            },
                            "key": "hidden 2244",
                            "startIndex": 2244,
                            "endIndex": 2267,
                            "inner": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L105",
                                  "index": 2257,
                                  "children": []
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  ],
                  "successor": {
                    "type": "stitch",
                    "item": {
                      "tag": "stitch",
                      "node": "L108",
                      "index": 2279,
                      "children": []
                    },
                    "key": "hidden 2279",
                    "startIndex": 2279,
                    "endIndex": 2666,
                    "inner": [
                      {
                        "type": "declaration",
                        "item": {
                          "tag": "declaration",
                          "node": "L109",
                          "index": 2293,
                          "children": []
                        },
                        "identifier": "MergeExecution_1",
                        "unmangled": {
                          "name": "MergeExecution",
                          "n": 1,
                          "tag": ""
                        },
                        "references": [
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L28",
                              "index": 593,
                              "children": []
                            }
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L37",
                              "index": 788,
                              "children": []
                            }
                          }
                        ]
                      },
                      {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L111",
                          "index": 2326,
                          "children": []
                        },
                        "key": "1 17",
                        "startIndex": 2326,
                        "endIndex": 2388,
                        "inner": [
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L112",
                              "index": 2350,
                              "children": []
                            },
                            "identifier": "throttle_0Pure",
                            "unmangled": {
                              "name": "throttle",
                              "n": 0,
                              "tag": "Pure"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L115",
                                  "index": 2423,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L112",
                              "index": 2367,
                              "children": []
                            }
                          }
                        ],
                        "coordinates": [
                          1,
                          17
                        ],
                        "successor": {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L114",
                            "index": 2388,
                            "children": []
                          },
                          "key": "2 17",
                          "startIndex": 2388,
                          "endIndex": 2524,
                          "inner": [
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L115",
                                "index": 2412,
                                "children": []
                              },
                              "identifier": "a_0Input",
                              "unmangled": {
                                "name": "a",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L117",
                                    "index": 2494,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L115",
                                "index": 2423,
                                "children": []
                              }
                            },
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L116",
                                "index": 2453,
                                "children": []
                              },
                              "identifier": "b_0Input",
                              "unmangled": {
                                "name": "b",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L117",
                                    "index": 2505,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L117",
                                "index": 2482,
                                "children": []
                              },
                              "identifier": "sum_0Pure",
                              "unmangled": {
                                "name": "sum",
                                "n": 0,
                                "tag": "Pure"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L120",
                                    "index": 2579,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L117",
                                "index": 2494,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L117",
                                "index": 2505,
                                "children": []
                              }
                            }
                          ],
                          "coordinates": [
                            2,
                            17
                          ],
                          "successor": {
                            "type": "stitch",
                            "item": {
                              "tag": "stitch",
                              "node": "L119",
                              "index": 2524,
                              "children": []
                            },
                            "key": "3 11",
                            "startIndex": 2524,
                            "endIndex": 2637,
                            "inner": [
                              {
                                "type": "declaration",
                                "item": {
                                  "tag": "declaration",
                                  "node": "L120",
                                  "index": 2561,
                                  "children": []
                                },
                                "identifier": "throttle_0Input",
                                "unmangled": {
                                  "name": "throttle",
                                  "n": 0,
                                  "tag": "Input"
                                },
                                "references": [
                                  {
                                    "type": "reference",
                                    "item": {
                                      "tag": "reference",
                                      "node": "L121",
                                      "index": 2611,
                                      "children": []
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L120",
                                  "index": 2579,
                                  "children": []
                                }
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L121",
                                  "index": 2598,
                                  "children": []
                                }
                              },
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L121",
                                  "index": 2611,
                                  "children": []
                                }
                              }
                            ],
                            "coordinates": [
                              3,
                              11
                            ],
                            "label": "Set Throttle",
                            "successor": {
                              "type": "stitch",
                              "item": {
                                "tag": "stitch",
                                "node": "L123",
                                "index": 2637,
                                "children": []
                              },
                              "key": "hidden 2637",
                              "startIndex": 2637,
                              "endIndex": 2660,
                              "inner": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L124",
                                    "index": 2650,
                                    "children": []
                                  }
                                }
                              ]
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        ],
        "3 19": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L45",
              "index": 916,
              "children": []
            },
            "key": "3 19",
            "startIndex": 916,
            "endIndex": 1155,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L46",
                  "index": 967,
                  "children": []
                },
                "identifier": "keyboardEventSubscriber_2Internal",
                "unmangled": {
                  "name": "keyboardEventSubscriber",
                  "n": 2,
                  "tag": "Internal"
                },
                "references": []
              },
              {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L49",
                  "index": 1043,
                  "children": []
                },
                "key": "hidden 1043",
                "startIndex": 1043,
                "endIndex": 1078,
                "inner": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L50",
                      "index": 1068,
                      "children": []
                    }
                  }
                ],
                "label": "Pressed"
              },
              {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L53",
                  "index": 1118,
                  "children": []
                },
                "key": "hidden 1118",
                "startIndex": 1118,
                "endIndex": 1131,
                "inner": [],
                "label": "Released"
              }
            ],
            "coordinates": [
              3,
              19
            ],
            "label": "Keyboard \\"F\\"",
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L57",
                "index": 1155,
                "children": []
              },
              "key": "4 9",
              "startIndex": 1155,
              "endIndex": 1890,
              "inner": [
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L58",
                    "index": 1177,
                    "children": []
                  },
                  "identifier": "m_Counter_0Internal",
                  "unmangled": {
                    "name": "m_Counter",
                    "n": 0,
                    "tag": "Internal"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L63",
                        "index": 1267,
                        "children": []
                      }
                    },
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L65",
                        "index": 1339,
                        "children": []
                      }
                    },
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L86",
                        "index": 1854,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L60",
                    "index": 1212,
                    "children": []
                  },
                  "identifier": "Enter_0",
                  "unmangled": {
                    "name": "Enter",
                    "n": 0,
                    "tag": ""
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L105",
                        "index": 2257,
                        "children": []
                      }
                    },
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L124",
                        "index": 2650,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L62",
                    "index": 1240,
                    "children": []
                  },
                  "identifier": "n_0Input",
                  "unmangled": {
                    "name": "n",
                    "n": 0,
                    "tag": "Input"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L63",
                        "index": 1289,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L63",
                    "index": 1267,
                    "children": []
                  }
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L63",
                    "index": 1289,
                    "children": []
                  }
                },
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L65",
                    "index": 1325,
                    "children": []
                  },
                  "identifier": "counter_0",
                  "unmangled": {
                    "name": "counter",
                    "n": 0,
                    "tag": ""
                  },
                  "references": []
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L65",
                    "index": 1339,
                    "children": []
                  }
                },
                {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L67",
                    "index": 1373,
                    "children": []
                  },
                  "key": "hidden 1373",
                  "startIndex": 1373,
                  "endIndex": 1396,
                  "inner": [],
                  "label": "Exit",
                  "successor": {
                    "type": "stitch",
                    "item": {
                      "tag": "stitch",
                      "node": "L69",
                      "index": 1396,
                      "children": []
                    },
                    "key": "4 1",
                    "startIndex": 1396,
                    "endIndex": 1490,
                    "inner": [
                      {
                        "type": "declaration",
                        "item": {
                          "tag": "declaration",
                          "node": "L70",
                          "index": 1434,
                          "children": []
                        },
                        "identifier": "vehicleMovement_0Pure",
                        "unmangled": {
                          "name": "vehicleMovement",
                          "n": 0,
                          "tag": "Pure"
                        },
                        "references": [
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L76",
                              "index": 1641,
                              "children": []
                            }
                          }
                        ]
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L70",
                          "index": 1458,
                          "children": []
                        }
                      }
                    ],
                    "coordinates": [
                      4,
                      1
                    ],
                    "successor": {
                      "type": "stitch",
                      "item": {
                        "tag": "stitch",
                        "node": "L72",
                        "index": 1490,
                        "children": []
                      },
                      "key": "4 4",
                      "startIndex": 1490,
                      "endIndex": 1559,
                      "inner": [
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L73",
                            "index": 1517,
                            "children": []
                          },
                          "identifier": "throttle_0Pure",
                          "unmangled": {
                            "name": "throttle",
                            "n": 0,
                            "tag": "Pure"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L77",
                                "index": 1700,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L73",
                            "index": 1534,
                            "children": []
                          }
                        }
                      ],
                      "coordinates": [
                        4,
                        4
                      ],
                      "successor": {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L75",
                          "index": 1559,
                          "children": []
                        },
                        "key": "5 8",
                        "startIndex": 1559,
                        "endIndex": 1799,
                        "inner": [
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L76",
                              "index": 1616,
                              "children": []
                            },
                            "identifier": "vehicleMovement_0Input",
                            "unmangled": {
                              "name": "vehicleMovement",
                              "n": 0,
                              "tag": "Input"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L78",
                                  "index": 1728,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L76",
                              "index": 1641,
                              "children": []
                            }
                          },
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L77",
                              "index": 1682,
                              "children": []
                            },
                            "identifier": "throttle_0Input",
                            "unmangled": {
                              "name": "throttle",
                              "n": 0,
                              "tag": "Input"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L78",
                                  "index": 1768,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L77",
                              "index": 1700,
                              "children": []
                            }
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L78",
                              "index": 1728,
                              "children": []
                            }
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L78",
                              "index": 1768,
                              "children": []
                            }
                          }
                        ],
                        "coordinates": [
                          5,
                          8
                        ],
                        "label": "Set Throttle Input",
                        "successor": {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L80",
                            "index": 1799,
                            "children": []
                          },
                          "key": "hidden 1799",
                          "startIndex": 1799,
                          "endIndex": 1803,
                          "inner": []
                        }
                      }
                    }
                  }
                },
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L84",
                    "index": 1830,
                    "children": []
                  },
                  "identifier": "Reset_0",
                  "unmangled": {
                    "name": "Reset",
                    "n": 0,
                    "tag": ""
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L50",
                        "index": 1068,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L86",
                    "index": 1854,
                    "children": []
                  }
                }
              ],
              "coordinates": [
                4,
                9
              ],
              "label": "Do N",
              "successor": {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L89",
                  "index": 1890,
                  "children": []
                },
                "key": "hidden 1890",
                "startIndex": 1890,
                "endIndex": 2279,
                "inner": [
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L90",
                      "index": 1904,
                      "children": []
                    },
                    "identifier": "MergeExecution_0",
                    "unmangled": {
                      "name": "MergeExecution",
                      "n": 0,
                      "tag": ""
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L24",
                          "index": 508,
                          "children": []
                        }
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L41",
                          "index": 873,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "stitch",
                    "item": {
                      "tag": "stitch",
                      "node": "L92",
                      "index": 1937,
                      "children": []
                    },
                    "key": "1 1",
                    "startIndex": 1937,
                    "endIndex": 1998,
                    "inner": [
                      {
                        "type": "declaration",
                        "item": {
                          "tag": "declaration",
                          "node": "L93",
                          "index": 1960,
                          "children": []
                        },
                        "identifier": "throttle_0Pure",
                        "unmangled": {
                          "name": "throttle",
                          "n": 0,
                          "tag": "Pure"
                        },
                        "references": [
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L96",
                              "index": 2032,
                              "children": []
                            }
                          }
                        ]
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L93",
                          "index": 1977,
                          "children": []
                        }
                      }
                    ],
                    "coordinates": [
                      1,
                      1
                    ],
                    "successor": {
                      "type": "stitch",
                      "item": {
                        "tag": "stitch",
                        "node": "L95",
                        "index": 1998,
                        "children": []
                      },
                      "key": "2 1",
                      "startIndex": 1998,
                      "endIndex": 2132,
                      "inner": [
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L96",
                            "index": 2021,
                            "children": []
                          },
                          "identifier": "a_0Input",
                          "unmangled": {
                            "name": "a",
                            "n": 0,
                            "tag": "Input"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L98",
                                "index": 2102,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L96",
                            "index": 2032,
                            "children": []
                          }
                        },
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L97",
                            "index": 2062,
                            "children": []
                          },
                          "identifier": "b_0Input",
                          "unmangled": {
                            "name": "b",
                            "n": 0,
                            "tag": "Input"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L98",
                                "index": 2113,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L98",
                            "index": 2090,
                            "children": []
                          },
                          "identifier": "sum_0Pure",
                          "unmangled": {
                            "name": "sum",
                            "n": 0,
                            "tag": "Pure"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L101",
                                "index": 2186,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L98",
                            "index": 2102,
                            "children": []
                          }
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L98",
                            "index": 2113,
                            "children": []
                          }
                        }
                      ],
                      "coordinates": [
                        2,
                        1
                      ],
                      "successor": {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L100",
                          "index": 2132,
                          "children": []
                        },
                        "key": "3 6",
                        "startIndex": 2132,
                        "endIndex": 2244,
                        "inner": [
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L101",
                              "index": 2168,
                              "children": []
                            },
                            "identifier": "throttle_0Input",
                            "unmangled": {
                              "name": "throttle",
                              "n": 0,
                              "tag": "Input"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L102",
                                  "index": 2218,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L101",
                              "index": 2186,
                              "children": []
                            }
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L102",
                              "index": 2205,
                              "children": []
                            }
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L102",
                              "index": 2218,
                              "children": []
                            }
                          }
                        ],
                        "coordinates": [
                          3,
                          6
                        ],
                        "label": "Set Throttle",
                        "successor": {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L104",
                            "index": 2244,
                            "children": []
                          },
                          "key": "hidden 2244",
                          "startIndex": 2244,
                          "endIndex": 2267,
                          "inner": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L105",
                                "index": 2257,
                                "children": []
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                ],
                "successor": {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L108",
                    "index": 2279,
                    "children": []
                  },
                  "key": "hidden 2279",
                  "startIndex": 2279,
                  "endIndex": 2666,
                  "inner": [
                    {
                      "type": "declaration",
                      "item": {
                        "tag": "declaration",
                        "node": "L109",
                        "index": 2293,
                        "children": []
                      },
                      "identifier": "MergeExecution_1",
                      "unmangled": {
                        "name": "MergeExecution",
                        "n": 1,
                        "tag": ""
                      },
                      "references": [
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L28",
                            "index": 593,
                            "children": []
                          }
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L37",
                            "index": 788,
                            "children": []
                          }
                        }
                      ]
                    },
                    {
                      "type": "stitch",
                      "item": {
                        "tag": "stitch",
                        "node": "L111",
                        "index": 2326,
                        "children": []
                      },
                      "key": "1 17",
                      "startIndex": 2326,
                      "endIndex": 2388,
                      "inner": [
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L112",
                            "index": 2350,
                            "children": []
                          },
                          "identifier": "throttle_0Pure",
                          "unmangled": {
                            "name": "throttle",
                            "n": 0,
                            "tag": "Pure"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L115",
                                "index": 2423,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L112",
                            "index": 2367,
                            "children": []
                          }
                        }
                      ],
                      "coordinates": [
                        1,
                        17
                      ],
                      "successor": {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L114",
                          "index": 2388,
                          "children": []
                        },
                        "key": "2 17",
                        "startIndex": 2388,
                        "endIndex": 2524,
                        "inner": [
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L115",
                              "index": 2412,
                              "children": []
                            },
                            "identifier": "a_0Input",
                            "unmangled": {
                              "name": "a",
                              "n": 0,
                              "tag": "Input"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L117",
                                  "index": 2494,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L115",
                              "index": 2423,
                              "children": []
                            }
                          },
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L116",
                              "index": 2453,
                              "children": []
                            },
                            "identifier": "b_0Input",
                            "unmangled": {
                              "name": "b",
                              "n": 0,
                              "tag": "Input"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L117",
                                  "index": 2505,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L117",
                              "index": 2482,
                              "children": []
                            },
                            "identifier": "sum_0Pure",
                            "unmangled": {
                              "name": "sum",
                              "n": 0,
                              "tag": "Pure"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L120",
                                  "index": 2579,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L117",
                              "index": 2494,
                              "children": []
                            }
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L117",
                              "index": 2505,
                              "children": []
                            }
                          }
                        ],
                        "coordinates": [
                          2,
                          17
                        ],
                        "successor": {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L119",
                            "index": 2524,
                            "children": []
                          },
                          "key": "3 11",
                          "startIndex": 2524,
                          "endIndex": 2637,
                          "inner": [
                            {
                              "type": "declaration",
                              "item": {
                                "tag": "declaration",
                                "node": "L120",
                                "index": 2561,
                                "children": []
                              },
                              "identifier": "throttle_0Input",
                              "unmangled": {
                                "name": "throttle",
                                "n": 0,
                                "tag": "Input"
                              },
                              "references": [
                                {
                                  "type": "reference",
                                  "item": {
                                    "tag": "reference",
                                    "node": "L121",
                                    "index": 2611,
                                    "children": []
                                  }
                                }
                              ]
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L120",
                                "index": 2579,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L121",
                                "index": 2598,
                                "children": []
                              }
                            },
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L121",
                                "index": 2611,
                                "children": []
                              }
                            }
                          ],
                          "coordinates": [
                            3,
                            11
                          ],
                          "label": "Set Throttle",
                          "successor": {
                            "type": "stitch",
                            "item": {
                              "tag": "stitch",
                              "node": "L123",
                              "index": 2637,
                              "children": []
                            },
                            "key": "hidden 2637",
                            "startIndex": 2637,
                            "endIndex": 2660,
                            "inner": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L124",
                                  "index": 2650,
                                  "children": []
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        ],
        "4 9": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L57",
              "index": 1155,
              "children": []
            },
            "key": "4 9",
            "startIndex": 1155,
            "endIndex": 1890,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L58",
                  "index": 1177,
                  "children": []
                },
                "identifier": "m_Counter_0Internal",
                "unmangled": {
                  "name": "m_Counter",
                  "n": 0,
                  "tag": "Internal"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L63",
                      "index": 1267,
                      "children": []
                    }
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L65",
                      "index": 1339,
                      "children": []
                    }
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L86",
                      "index": 1854,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L60",
                  "index": 1212,
                  "children": []
                },
                "identifier": "Enter_0",
                "unmangled": {
                  "name": "Enter",
                  "n": 0,
                  "tag": ""
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L105",
                      "index": 2257,
                      "children": []
                    }
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L124",
                      "index": 2650,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L62",
                  "index": 1240,
                  "children": []
                },
                "identifier": "n_0Input",
                "unmangled": {
                  "name": "n",
                  "n": 0,
                  "tag": "Input"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L63",
                      "index": 1289,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L63",
                  "index": 1267,
                  "children": []
                }
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L63",
                  "index": 1289,
                  "children": []
                }
              },
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L65",
                  "index": 1325,
                  "children": []
                },
                "identifier": "counter_0",
                "unmangled": {
                  "name": "counter",
                  "n": 0,
                  "tag": ""
                },
                "references": []
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L65",
                  "index": 1339,
                  "children": []
                }
              },
              {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L67",
                  "index": 1373,
                  "children": []
                },
                "key": "hidden 1373",
                "startIndex": 1373,
                "endIndex": 1396,
                "inner": [],
                "label": "Exit",
                "successor": {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L69",
                    "index": 1396,
                    "children": []
                  },
                  "key": "4 1",
                  "startIndex": 1396,
                  "endIndex": 1490,
                  "inner": [
                    {
                      "type": "declaration",
                      "item": {
                        "tag": "declaration",
                        "node": "L70",
                        "index": 1434,
                        "children": []
                      },
                      "identifier": "vehicleMovement_0Pure",
                      "unmangled": {
                        "name": "vehicleMovement",
                        "n": 0,
                        "tag": "Pure"
                      },
                      "references": [
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L76",
                            "index": 1641,
                            "children": []
                          }
                        }
                      ]
                    },
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L70",
                        "index": 1458,
                        "children": []
                      }
                    }
                  ],
                  "coordinates": [
                    4,
                    1
                  ],
                  "successor": {
                    "type": "stitch",
                    "item": {
                      "tag": "stitch",
                      "node": "L72",
                      "index": 1490,
                      "children": []
                    },
                    "key": "4 4",
                    "startIndex": 1490,
                    "endIndex": 1559,
                    "inner": [
                      {
                        "type": "declaration",
                        "item": {
                          "tag": "declaration",
                          "node": "L73",
                          "index": 1517,
                          "children": []
                        },
                        "identifier": "throttle_0Pure",
                        "unmangled": {
                          "name": "throttle",
                          "n": 0,
                          "tag": "Pure"
                        },
                        "references": [
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L77",
                              "index": 1700,
                              "children": []
                            }
                          }
                        ]
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L73",
                          "index": 1534,
                          "children": []
                        }
                      }
                    ],
                    "coordinates": [
                      4,
                      4
                    ],
                    "successor": {
                      "type": "stitch",
                      "item": {
                        "tag": "stitch",
                        "node": "L75",
                        "index": 1559,
                        "children": []
                      },
                      "key": "5 8",
                      "startIndex": 1559,
                      "endIndex": 1799,
                      "inner": [
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L76",
                            "index": 1616,
                            "children": []
                          },
                          "identifier": "vehicleMovement_0Input",
                          "unmangled": {
                            "name": "vehicleMovement",
                            "n": 0,
                            "tag": "Input"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L78",
                                "index": 1728,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L76",
                            "index": 1641,
                            "children": []
                          }
                        },
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L77",
                            "index": 1682,
                            "children": []
                          },
                          "identifier": "throttle_0Input",
                          "unmangled": {
                            "name": "throttle",
                            "n": 0,
                            "tag": "Input"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L78",
                                "index": 1768,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L77",
                            "index": 1700,
                            "children": []
                          }
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L78",
                            "index": 1728,
                            "children": []
                          }
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L78",
                            "index": 1768,
                            "children": []
                          }
                        }
                      ],
                      "coordinates": [
                        5,
                        8
                      ],
                      "label": "Set Throttle Input",
                      "successor": {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L80",
                          "index": 1799,
                          "children": []
                        },
                        "key": "hidden 1799",
                        "startIndex": 1799,
                        "endIndex": 1803,
                        "inner": []
                      }
                    }
                  }
                }
              },
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L84",
                  "index": 1830,
                  "children": []
                },
                "identifier": "Reset_0",
                "unmangled": {
                  "name": "Reset",
                  "n": 0,
                  "tag": ""
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L50",
                      "index": 1068,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L86",
                  "index": 1854,
                  "children": []
                }
              }
            ],
            "coordinates": [
              4,
              9
            ],
            "label": "Do N",
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L89",
                "index": 1890,
                "children": []
              },
              "key": "hidden 1890",
              "startIndex": 1890,
              "endIndex": 2279,
              "inner": [
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L90",
                    "index": 1904,
                    "children": []
                  },
                  "identifier": "MergeExecution_0",
                  "unmangled": {
                    "name": "MergeExecution",
                    "n": 0,
                    "tag": ""
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L24",
                        "index": 508,
                        "children": []
                      }
                    },
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L41",
                        "index": 873,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L92",
                    "index": 1937,
                    "children": []
                  },
                  "key": "1 1",
                  "startIndex": 1937,
                  "endIndex": 1998,
                  "inner": [
                    {
                      "type": "declaration",
                      "item": {
                        "tag": "declaration",
                        "node": "L93",
                        "index": 1960,
                        "children": []
                      },
                      "identifier": "throttle_0Pure",
                      "unmangled": {
                        "name": "throttle",
                        "n": 0,
                        "tag": "Pure"
                      },
                      "references": [
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L96",
                            "index": 2032,
                            "children": []
                          }
                        }
                      ]
                    },
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L93",
                        "index": 1977,
                        "children": []
                      }
                    }
                  ],
                  "coordinates": [
                    1,
                    1
                  ],
                  "successor": {
                    "type": "stitch",
                    "item": {
                      "tag": "stitch",
                      "node": "L95",
                      "index": 1998,
                      "children": []
                    },
                    "key": "2 1",
                    "startIndex": 1998,
                    "endIndex": 2132,
                    "inner": [
                      {
                        "type": "declaration",
                        "item": {
                          "tag": "declaration",
                          "node": "L96",
                          "index": 2021,
                          "children": []
                        },
                        "identifier": "a_0Input",
                        "unmangled": {
                          "name": "a",
                          "n": 0,
                          "tag": "Input"
                        },
                        "references": [
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L98",
                              "index": 2102,
                              "children": []
                            }
                          }
                        ]
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L96",
                          "index": 2032,
                          "children": []
                        }
                      },
                      {
                        "type": "declaration",
                        "item": {
                          "tag": "declaration",
                          "node": "L97",
                          "index": 2062,
                          "children": []
                        },
                        "identifier": "b_0Input",
                        "unmangled": {
                          "name": "b",
                          "n": 0,
                          "tag": "Input"
                        },
                        "references": [
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L98",
                              "index": 2113,
                              "children": []
                            }
                          }
                        ]
                      },
                      {
                        "type": "declaration",
                        "item": {
                          "tag": "declaration",
                          "node": "L98",
                          "index": 2090,
                          "children": []
                        },
                        "identifier": "sum_0Pure",
                        "unmangled": {
                          "name": "sum",
                          "n": 0,
                          "tag": "Pure"
                        },
                        "references": [
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L101",
                              "index": 2186,
                              "children": []
                            }
                          }
                        ]
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L98",
                          "index": 2102,
                          "children": []
                        }
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L98",
                          "index": 2113,
                          "children": []
                        }
                      }
                    ],
                    "coordinates": [
                      2,
                      1
                    ],
                    "successor": {
                      "type": "stitch",
                      "item": {
                        "tag": "stitch",
                        "node": "L100",
                        "index": 2132,
                        "children": []
                      },
                      "key": "3 6",
                      "startIndex": 2132,
                      "endIndex": 2244,
                      "inner": [
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L101",
                            "index": 2168,
                            "children": []
                          },
                          "identifier": "throttle_0Input",
                          "unmangled": {
                            "name": "throttle",
                            "n": 0,
                            "tag": "Input"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L102",
                                "index": 2218,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L101",
                            "index": 2186,
                            "children": []
                          }
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L102",
                            "index": 2205,
                            "children": []
                          }
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L102",
                            "index": 2218,
                            "children": []
                          }
                        }
                      ],
                      "coordinates": [
                        3,
                        6
                      ],
                      "label": "Set Throttle",
                      "successor": {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L104",
                          "index": 2244,
                          "children": []
                        },
                        "key": "hidden 2244",
                        "startIndex": 2244,
                        "endIndex": 2267,
                        "inner": [
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L105",
                              "index": 2257,
                              "children": []
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              ],
              "successor": {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L108",
                  "index": 2279,
                  "children": []
                },
                "key": "hidden 2279",
                "startIndex": 2279,
                "endIndex": 2666,
                "inner": [
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L109",
                      "index": 2293,
                      "children": []
                    },
                    "identifier": "MergeExecution_1",
                    "unmangled": {
                      "name": "MergeExecution",
                      "n": 1,
                      "tag": ""
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L28",
                          "index": 593,
                          "children": []
                        }
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L37",
                          "index": 788,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "stitch",
                    "item": {
                      "tag": "stitch",
                      "node": "L111",
                      "index": 2326,
                      "children": []
                    },
                    "key": "1 17",
                    "startIndex": 2326,
                    "endIndex": 2388,
                    "inner": [
                      {
                        "type": "declaration",
                        "item": {
                          "tag": "declaration",
                          "node": "L112",
                          "index": 2350,
                          "children": []
                        },
                        "identifier": "throttle_0Pure",
                        "unmangled": {
                          "name": "throttle",
                          "n": 0,
                          "tag": "Pure"
                        },
                        "references": [
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L115",
                              "index": 2423,
                              "children": []
                            }
                          }
                        ]
                      },
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L112",
                          "index": 2367,
                          "children": []
                        }
                      }
                    ],
                    "coordinates": [
                      1,
                      17
                    ],
                    "successor": {
                      "type": "stitch",
                      "item": {
                        "tag": "stitch",
                        "node": "L114",
                        "index": 2388,
                        "children": []
                      },
                      "key": "2 17",
                      "startIndex": 2388,
                      "endIndex": 2524,
                      "inner": [
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L115",
                            "index": 2412,
                            "children": []
                          },
                          "identifier": "a_0Input",
                          "unmangled": {
                            "name": "a",
                            "n": 0,
                            "tag": "Input"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L117",
                                "index": 2494,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L115",
                            "index": 2423,
                            "children": []
                          }
                        },
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L116",
                            "index": 2453,
                            "children": []
                          },
                          "identifier": "b_0Input",
                          "unmangled": {
                            "name": "b",
                            "n": 0,
                            "tag": "Input"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L117",
                                "index": 2505,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "declaration",
                          "item": {
                            "tag": "declaration",
                            "node": "L117",
                            "index": 2482,
                            "children": []
                          },
                          "identifier": "sum_0Pure",
                          "unmangled": {
                            "name": "sum",
                            "n": 0,
                            "tag": "Pure"
                          },
                          "references": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L120",
                                "index": 2579,
                                "children": []
                              }
                            }
                          ]
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L117",
                            "index": 2494,
                            "children": []
                          }
                        },
                        {
                          "type": "reference",
                          "item": {
                            "tag": "reference",
                            "node": "L117",
                            "index": 2505,
                            "children": []
                          }
                        }
                      ],
                      "coordinates": [
                        2,
                        17
                      ],
                      "successor": {
                        "type": "stitch",
                        "item": {
                          "tag": "stitch",
                          "node": "L119",
                          "index": 2524,
                          "children": []
                        },
                        "key": "3 11",
                        "startIndex": 2524,
                        "endIndex": 2637,
                        "inner": [
                          {
                            "type": "declaration",
                            "item": {
                              "tag": "declaration",
                              "node": "L120",
                              "index": 2561,
                              "children": []
                            },
                            "identifier": "throttle_0Input",
                            "unmangled": {
                              "name": "throttle",
                              "n": 0,
                              "tag": "Input"
                            },
                            "references": [
                              {
                                "type": "reference",
                                "item": {
                                  "tag": "reference",
                                  "node": "L121",
                                  "index": 2611,
                                  "children": []
                                }
                              }
                            ]
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L120",
                              "index": 2579,
                              "children": []
                            }
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L121",
                              "index": 2598,
                              "children": []
                            }
                          },
                          {
                            "type": "reference",
                            "item": {
                              "tag": "reference",
                              "node": "L121",
                              "index": 2611,
                              "children": []
                            }
                          }
                        ],
                        "coordinates": [
                          3,
                          11
                        ],
                        "label": "Set Throttle",
                        "successor": {
                          "type": "stitch",
                          "item": {
                            "tag": "stitch",
                            "node": "L123",
                            "index": 2637,
                            "children": []
                          },
                          "key": "hidden 2637",
                          "startIndex": 2637,
                          "endIndex": 2660,
                          "inner": [
                            {
                              "type": "reference",
                              "item": {
                                "tag": "reference",
                                "node": "L124",
                                "index": 2650,
                                "children": []
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        ],
        "4 1": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L69",
              "index": 1396,
              "children": []
            },
            "key": "4 1",
            "startIndex": 1396,
            "endIndex": 1490,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L70",
                  "index": 1434,
                  "children": []
                },
                "identifier": "vehicleMovement_0Pure",
                "unmangled": {
                  "name": "vehicleMovement",
                  "n": 0,
                  "tag": "Pure"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L76",
                      "index": 1641,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L70",
                  "index": 1458,
                  "children": []
                }
              }
            ],
            "coordinates": [
              4,
              1
            ],
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L72",
                "index": 1490,
                "children": []
              },
              "key": "4 4",
              "startIndex": 1490,
              "endIndex": 1559,
              "inner": [
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L73",
                    "index": 1517,
                    "children": []
                  },
                  "identifier": "throttle_0Pure",
                  "unmangled": {
                    "name": "throttle",
                    "n": 0,
                    "tag": "Pure"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L77",
                        "index": 1700,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L73",
                    "index": 1534,
                    "children": []
                  }
                }
              ],
              "coordinates": [
                4,
                4
              ],
              "successor": {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L75",
                  "index": 1559,
                  "children": []
                },
                "key": "5 8",
                "startIndex": 1559,
                "endIndex": 1799,
                "inner": [
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L76",
                      "index": 1616,
                      "children": []
                    },
                    "identifier": "vehicleMovement_0Input",
                    "unmangled": {
                      "name": "vehicleMovement",
                      "n": 0,
                      "tag": "Input"
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L78",
                          "index": 1728,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L76",
                      "index": 1641,
                      "children": []
                    }
                  },
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L77",
                      "index": 1682,
                      "children": []
                    },
                    "identifier": "throttle_0Input",
                    "unmangled": {
                      "name": "throttle",
                      "n": 0,
                      "tag": "Input"
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L78",
                          "index": 1768,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L77",
                      "index": 1700,
                      "children": []
                    }
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L78",
                      "index": 1728,
                      "children": []
                    }
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L78",
                      "index": 1768,
                      "children": []
                    }
                  }
                ],
                "coordinates": [
                  5,
                  8
                ],
                "label": "Set Throttle Input",
                "successor": {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L80",
                    "index": 1799,
                    "children": []
                  },
                  "key": "hidden 1799",
                  "startIndex": 1799,
                  "endIndex": 1803,
                  "inner": []
                }
              }
            }
          }
        ],
        "4 4": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L72",
              "index": 1490,
              "children": []
            },
            "key": "4 4",
            "startIndex": 1490,
            "endIndex": 1559,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L73",
                  "index": 1517,
                  "children": []
                },
                "identifier": "throttle_0Pure",
                "unmangled": {
                  "name": "throttle",
                  "n": 0,
                  "tag": "Pure"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L77",
                      "index": 1700,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L73",
                  "index": 1534,
                  "children": []
                }
              }
            ],
            "coordinates": [
              4,
              4
            ],
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L75",
                "index": 1559,
                "children": []
              },
              "key": "5 8",
              "startIndex": 1559,
              "endIndex": 1799,
              "inner": [
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L76",
                    "index": 1616,
                    "children": []
                  },
                  "identifier": "vehicleMovement_0Input",
                  "unmangled": {
                    "name": "vehicleMovement",
                    "n": 0,
                    "tag": "Input"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L78",
                        "index": 1728,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L76",
                    "index": 1641,
                    "children": []
                  }
                },
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L77",
                    "index": 1682,
                    "children": []
                  },
                  "identifier": "throttle_0Input",
                  "unmangled": {
                    "name": "throttle",
                    "n": 0,
                    "tag": "Input"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L78",
                        "index": 1768,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L77",
                    "index": 1700,
                    "children": []
                  }
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L78",
                    "index": 1728,
                    "children": []
                  }
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L78",
                    "index": 1768,
                    "children": []
                  }
                }
              ],
              "coordinates": [
                5,
                8
              ],
              "label": "Set Throttle Input",
              "successor": {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L80",
                  "index": 1799,
                  "children": []
                },
                "key": "hidden 1799",
                "startIndex": 1799,
                "endIndex": 1803,
                "inner": []
              }
            }
          }
        ],
        "5 8": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L75",
              "index": 1559,
              "children": []
            },
            "key": "5 8",
            "startIndex": 1559,
            "endIndex": 1799,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L76",
                  "index": 1616,
                  "children": []
                },
                "identifier": "vehicleMovement_0Input",
                "unmangled": {
                  "name": "vehicleMovement",
                  "n": 0,
                  "tag": "Input"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L78",
                      "index": 1728,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L76",
                  "index": 1641,
                  "children": []
                }
              },
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L77",
                  "index": 1682,
                  "children": []
                },
                "identifier": "throttle_0Input",
                "unmangled": {
                  "name": "throttle",
                  "n": 0,
                  "tag": "Input"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L78",
                      "index": 1768,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L77",
                  "index": 1700,
                  "children": []
                }
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L78",
                  "index": 1728,
                  "children": []
                }
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L78",
                  "index": 1768,
                  "children": []
                }
              }
            ],
            "coordinates": [
              5,
              8
            ],
            "label": "Set Throttle Input",
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L80",
                "index": 1799,
                "children": []
              },
              "key": "hidden 1799",
              "startIndex": 1799,
              "endIndex": 1803,
              "inner": []
            }
          }
        ],
        "1 1": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L92",
              "index": 1937,
              "children": []
            },
            "key": "1 1",
            "startIndex": 1937,
            "endIndex": 1998,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L93",
                  "index": 1960,
                  "children": []
                },
                "identifier": "throttle_0Pure",
                "unmangled": {
                  "name": "throttle",
                  "n": 0,
                  "tag": "Pure"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L96",
                      "index": 2032,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L93",
                  "index": 1977,
                  "children": []
                }
              }
            ],
            "coordinates": [
              1,
              1
            ],
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L95",
                "index": 1998,
                "children": []
              },
              "key": "2 1",
              "startIndex": 1998,
              "endIndex": 2132,
              "inner": [
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L96",
                    "index": 2021,
                    "children": []
                  },
                  "identifier": "a_0Input",
                  "unmangled": {
                    "name": "a",
                    "n": 0,
                    "tag": "Input"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L98",
                        "index": 2102,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L96",
                    "index": 2032,
                    "children": []
                  }
                },
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L97",
                    "index": 2062,
                    "children": []
                  },
                  "identifier": "b_0Input",
                  "unmangled": {
                    "name": "b",
                    "n": 0,
                    "tag": "Input"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L98",
                        "index": 2113,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L98",
                    "index": 2090,
                    "children": []
                  },
                  "identifier": "sum_0Pure",
                  "unmangled": {
                    "name": "sum",
                    "n": 0,
                    "tag": "Pure"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L101",
                        "index": 2186,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L98",
                    "index": 2102,
                    "children": []
                  }
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L98",
                    "index": 2113,
                    "children": []
                  }
                }
              ],
              "coordinates": [
                2,
                1
              ],
              "successor": {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L100",
                  "index": 2132,
                  "children": []
                },
                "key": "3 6",
                "startIndex": 2132,
                "endIndex": 2244,
                "inner": [
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L101",
                      "index": 2168,
                      "children": []
                    },
                    "identifier": "throttle_0Input",
                    "unmangled": {
                      "name": "throttle",
                      "n": 0,
                      "tag": "Input"
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L102",
                          "index": 2218,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L101",
                      "index": 2186,
                      "children": []
                    }
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L102",
                      "index": 2205,
                      "children": []
                    }
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L102",
                      "index": 2218,
                      "children": []
                    }
                  }
                ],
                "coordinates": [
                  3,
                  6
                ],
                "label": "Set Throttle",
                "successor": {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L104",
                    "index": 2244,
                    "children": []
                  },
                  "key": "hidden 2244",
                  "startIndex": 2244,
                  "endIndex": 2267,
                  "inner": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L105",
                        "index": 2257,
                        "children": []
                      }
                    }
                  ]
                }
              }
            }
          }
        ],
        "2 1": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L95",
              "index": 1998,
              "children": []
            },
            "key": "2 1",
            "startIndex": 1998,
            "endIndex": 2132,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L96",
                  "index": 2021,
                  "children": []
                },
                "identifier": "a_0Input",
                "unmangled": {
                  "name": "a",
                  "n": 0,
                  "tag": "Input"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L98",
                      "index": 2102,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L96",
                  "index": 2032,
                  "children": []
                }
              },
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L97",
                  "index": 2062,
                  "children": []
                },
                "identifier": "b_0Input",
                "unmangled": {
                  "name": "b",
                  "n": 0,
                  "tag": "Input"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L98",
                      "index": 2113,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L98",
                  "index": 2090,
                  "children": []
                },
                "identifier": "sum_0Pure",
                "unmangled": {
                  "name": "sum",
                  "n": 0,
                  "tag": "Pure"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L101",
                      "index": 2186,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L98",
                  "index": 2102,
                  "children": []
                }
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L98",
                  "index": 2113,
                  "children": []
                }
              }
            ],
            "coordinates": [
              2,
              1
            ],
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L100",
                "index": 2132,
                "children": []
              },
              "key": "3 6",
              "startIndex": 2132,
              "endIndex": 2244,
              "inner": [
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L101",
                    "index": 2168,
                    "children": []
                  },
                  "identifier": "throttle_0Input",
                  "unmangled": {
                    "name": "throttle",
                    "n": 0,
                    "tag": "Input"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L102",
                        "index": 2218,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L101",
                    "index": 2186,
                    "children": []
                  }
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L102",
                    "index": 2205,
                    "children": []
                  }
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L102",
                    "index": 2218,
                    "children": []
                  }
                }
              ],
              "coordinates": [
                3,
                6
              ],
              "label": "Set Throttle",
              "successor": {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L104",
                  "index": 2244,
                  "children": []
                },
                "key": "hidden 2244",
                "startIndex": 2244,
                "endIndex": 2267,
                "inner": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L105",
                      "index": 2257,
                      "children": []
                    }
                  }
                ]
              }
            }
          }
        ],
        "3 6": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L100",
              "index": 2132,
              "children": []
            },
            "key": "3 6",
            "startIndex": 2132,
            "endIndex": 2244,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L101",
                  "index": 2168,
                  "children": []
                },
                "identifier": "throttle_0Input",
                "unmangled": {
                  "name": "throttle",
                  "n": 0,
                  "tag": "Input"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L102",
                      "index": 2218,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L101",
                  "index": 2186,
                  "children": []
                }
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L102",
                  "index": 2205,
                  "children": []
                }
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L102",
                  "index": 2218,
                  "children": []
                }
              }
            ],
            "coordinates": [
              3,
              6
            ],
            "label": "Set Throttle",
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L104",
                "index": 2244,
                "children": []
              },
              "key": "hidden 2244",
              "startIndex": 2244,
              "endIndex": 2267,
              "inner": [
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L105",
                    "index": 2257,
                    "children": []
                  }
                }
              ]
            }
          }
        ],
        "1 17": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L111",
              "index": 2326,
              "children": []
            },
            "key": "1 17",
            "startIndex": 2326,
            "endIndex": 2388,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L112",
                  "index": 2350,
                  "children": []
                },
                "identifier": "throttle_0Pure",
                "unmangled": {
                  "name": "throttle",
                  "n": 0,
                  "tag": "Pure"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L115",
                      "index": 2423,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L112",
                  "index": 2367,
                  "children": []
                }
              }
            ],
            "coordinates": [
              1,
              17
            ],
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L114",
                "index": 2388,
                "children": []
              },
              "key": "2 17",
              "startIndex": 2388,
              "endIndex": 2524,
              "inner": [
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L115",
                    "index": 2412,
                    "children": []
                  },
                  "identifier": "a_0Input",
                  "unmangled": {
                    "name": "a",
                    "n": 0,
                    "tag": "Input"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L117",
                        "index": 2494,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L115",
                    "index": 2423,
                    "children": []
                  }
                },
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L116",
                    "index": 2453,
                    "children": []
                  },
                  "identifier": "b_0Input",
                  "unmangled": {
                    "name": "b",
                    "n": 0,
                    "tag": "Input"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L117",
                        "index": 2505,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L117",
                    "index": 2482,
                    "children": []
                  },
                  "identifier": "sum_0Pure",
                  "unmangled": {
                    "name": "sum",
                    "n": 0,
                    "tag": "Pure"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L120",
                        "index": 2579,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L117",
                    "index": 2494,
                    "children": []
                  }
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L117",
                    "index": 2505,
                    "children": []
                  }
                }
              ],
              "coordinates": [
                2,
                17
              ],
              "successor": {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L119",
                  "index": 2524,
                  "children": []
                },
                "key": "3 11",
                "startIndex": 2524,
                "endIndex": 2637,
                "inner": [
                  {
                    "type": "declaration",
                    "item": {
                      "tag": "declaration",
                      "node": "L120",
                      "index": 2561,
                      "children": []
                    },
                    "identifier": "throttle_0Input",
                    "unmangled": {
                      "name": "throttle",
                      "n": 0,
                      "tag": "Input"
                    },
                    "references": [
                      {
                        "type": "reference",
                        "item": {
                          "tag": "reference",
                          "node": "L121",
                          "index": 2611,
                          "children": []
                        }
                      }
                    ]
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L120",
                      "index": 2579,
                      "children": []
                    }
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L121",
                      "index": 2598,
                      "children": []
                    }
                  },
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L121",
                      "index": 2611,
                      "children": []
                    }
                  }
                ],
                "coordinates": [
                  3,
                  11
                ],
                "label": "Set Throttle",
                "successor": {
                  "type": "stitch",
                  "item": {
                    "tag": "stitch",
                    "node": "L123",
                    "index": 2637,
                    "children": []
                  },
                  "key": "hidden 2637",
                  "startIndex": 2637,
                  "endIndex": 2660,
                  "inner": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L124",
                        "index": 2650,
                        "children": []
                      }
                    }
                  ]
                }
              }
            }
          }
        ],
        "2 17": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L114",
              "index": 2388,
              "children": []
            },
            "key": "2 17",
            "startIndex": 2388,
            "endIndex": 2524,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L115",
                  "index": 2412,
                  "children": []
                },
                "identifier": "a_0Input",
                "unmangled": {
                  "name": "a",
                  "n": 0,
                  "tag": "Input"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L117",
                      "index": 2494,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L115",
                  "index": 2423,
                  "children": []
                }
              },
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L116",
                  "index": 2453,
                  "children": []
                },
                "identifier": "b_0Input",
                "unmangled": {
                  "name": "b",
                  "n": 0,
                  "tag": "Input"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L117",
                      "index": 2505,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L117",
                  "index": 2482,
                  "children": []
                },
                "identifier": "sum_0Pure",
                "unmangled": {
                  "name": "sum",
                  "n": 0,
                  "tag": "Pure"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L120",
                      "index": 2579,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L117",
                  "index": 2494,
                  "children": []
                }
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L117",
                  "index": 2505,
                  "children": []
                }
              }
            ],
            "coordinates": [
              2,
              17
            ],
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L119",
                "index": 2524,
                "children": []
              },
              "key": "3 11",
              "startIndex": 2524,
              "endIndex": 2637,
              "inner": [
                {
                  "type": "declaration",
                  "item": {
                    "tag": "declaration",
                    "node": "L120",
                    "index": 2561,
                    "children": []
                  },
                  "identifier": "throttle_0Input",
                  "unmangled": {
                    "name": "throttle",
                    "n": 0,
                    "tag": "Input"
                  },
                  "references": [
                    {
                      "type": "reference",
                      "item": {
                        "tag": "reference",
                        "node": "L121",
                        "index": 2611,
                        "children": []
                      }
                    }
                  ]
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L120",
                    "index": 2579,
                    "children": []
                  }
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L121",
                    "index": 2598,
                    "children": []
                  }
                },
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L121",
                    "index": 2611,
                    "children": []
                  }
                }
              ],
              "coordinates": [
                3,
                11
              ],
              "label": "Set Throttle",
              "successor": {
                "type": "stitch",
                "item": {
                  "tag": "stitch",
                  "node": "L123",
                  "index": 2637,
                  "children": []
                },
                "key": "hidden 2637",
                "startIndex": 2637,
                "endIndex": 2660,
                "inner": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L124",
                      "index": 2650,
                      "children": []
                    }
                  }
                ]
              }
            }
          }
        ],
        "3 11": [
          {
            "type": "stitch",
            "item": {
              "tag": "stitch",
              "node": "L119",
              "index": 2524,
              "children": []
            },
            "key": "3 11",
            "startIndex": 2524,
            "endIndex": 2637,
            "inner": [
              {
                "type": "declaration",
                "item": {
                  "tag": "declaration",
                  "node": "L120",
                  "index": 2561,
                  "children": []
                },
                "identifier": "throttle_0Input",
                "unmangled": {
                  "name": "throttle",
                  "n": 0,
                  "tag": "Input"
                },
                "references": [
                  {
                    "type": "reference",
                    "item": {
                      "tag": "reference",
                      "node": "L121",
                      "index": 2611,
                      "children": []
                    }
                  }
                ]
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L120",
                  "index": 2579,
                  "children": []
                }
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L121",
                  "index": 2598,
                  "children": []
                }
              },
              {
                "type": "reference",
                "item": {
                  "tag": "reference",
                  "node": "L121",
                  "index": 2611,
                  "children": []
                }
              }
            ],
            "coordinates": [
              3,
              11
            ],
            "label": "Set Throttle",
            "successor": {
              "type": "stitch",
              "item": {
                "tag": "stitch",
                "node": "L123",
                "index": 2637,
                "children": []
              },
              "key": "hidden 2637",
              "startIndex": 2637,
              "endIndex": 2660,
              "inner": [
                {
                  "type": "reference",
                  "item": {
                    "tag": "reference",
                    "node": "L124",
                    "index": 2650,
                    "children": []
                  }
                }
              ]
            }
          }
        ]
      },
      "outline": {
        "tag": "root",
        "node": "L1",
        "index": 0,
        "children": [
          {
            "tag": "scope",
            "node": "L4",
            "index": 125,
            "children": [
              {
                "tag": "declaration",
                "node": "L6",
                "index": 162,
                "children": []
              },
              {
                "tag": "parameters",
                "node": "L6",
                "index": 185,
                "children": []
              }
            ]
          },
          {
            "tag": "scope",
            "node": "L10",
            "index": 225,
            "children": [
              {
                "tag": "declaration",
                "node": "L11",
                "index": 236,
                "children": []
              },
              {
                "tag": "parameters",
                "node": "L11",
                "index": 252,
                "children": [
                  {
                    "tag": "declaration",
                    "node": "L11",
                    "index": 259,
                    "children": []
                  }
                ]
              }
            ]
          },
          {
            "tag": "scope",
            "node": "L15",
            "index": 289,
            "children": [
              {
                "tag": "declaration",
                "node": "L16",
                "index": 301,
                "children": []
              },
              {
                "tag": "declaration",
                "node": "L17",
                "index": 333,
                "children": []
              },
              {
                "tag": "stitch",
                "node": "L19",
                "index": 357,
                "children": []
              },
              {
                "tag": "declaration",
                "node": "L20",
                "index": 407,
                "children": []
              },
              {
                "tag": "scope",
                "node": "L20",
                "index": 440,
                "children": [
                  {
                    "tag": "scope",
                    "node": "L22",
                    "index": 469,
                    "children": [
                      {
                        "tag": "stitch",
                        "node": "L23",
                        "index": 483,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L24",
                        "index": 508,
                        "children": []
                      }
                    ]
                  },
                  {
                    "tag": "scope",
                    "node": "L26",
                    "index": 553,
                    "children": [
                      {
                        "tag": "stitch",
                        "node": "L27",
                        "index": 567,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L28",
                        "index": 593,
                        "children": []
                      }
                    ]
                  }
                ]
              },
              {
                "tag": "stitch",
                "node": "L32",
                "index": 636,
                "children": []
              },
              {
                "tag": "declaration",
                "node": "L33",
                "index": 687,
                "children": []
              },
              {
                "tag": "scope",
                "node": "L33",
                "index": 720,
                "children": [
                  {
                    "tag": "scope",
                    "node": "L35",
                    "index": 749,
                    "children": [
                      {
                        "tag": "stitch",
                        "node": "L36",
                        "index": 763,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L37",
                        "index": 788,
                        "children": []
                      }
                    ]
                  },
                  {
                    "tag": "scope",
                    "node": "L39",
                    "index": 833,
                    "children": [
                      {
                        "tag": "stitch",
                        "node": "L40",
                        "index": 847,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L41",
                        "index": 873,
                        "children": []
                      }
                    ]
                  }
                ]
              },
              {
                "tag": "stitch",
                "node": "L45",
                "index": 916,
                "children": []
              },
              {
                "tag": "declaration",
                "node": "L46",
                "index": 967,
                "children": []
              },
              {
                "tag": "scope",
                "node": "L46",
                "index": 1000,
                "children": [
                  {
                    "tag": "scope",
                    "node": "L48",
                    "index": 1029,
                    "children": [
                      {
                        "tag": "stitch",
                        "node": "L49",
                        "index": 1043,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L50",
                        "index": 1068,
                        "children": []
                      }
                    ]
                  },
                  {
                    "tag": "scope",
                    "node": "L52",
                    "index": 1104,
                    "children": [
                      {
                        "tag": "stitch",
                        "node": "L53",
                        "index": 1118,
                        "children": []
                      }
                    ]
                  }
                ]
              },
              {
                "tag": "stitch",
                "node": "L57",
                "index": 1155,
                "children": []
              },
              {
                "tag": "declaration",
                "node": "L58",
                "index": 1177,
                "children": []
              },
              {
                "tag": "function",
                "node": "L60",
                "index": 1207,
                "children": [
                  {
                    "tag": "declaration",
                    "node": "L60",
                    "index": 1212,
                    "children": []
                  },
                  {
                    "tag": "parameters",
                    "node": "L60",
                    "index": 1219,
                    "children": []
                  },
                  {
                    "tag": "scope",
                    "node": "L61",
                    "index": 1226,
                    "children": [
                      {
                        "tag": "declaration",
                        "node": "L62",
                        "index": 1240,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L63",
                        "index": 1267,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L63",
                        "index": 1289,
                        "children": []
                      },
                      {
                        "tag": "scope",
                        "node": "L64",
                        "index": 1307,
                        "children": [
                          {
                            "tag": "declaration",
                            "node": "L65",
                            "index": 1325,
                            "children": []
                          },
                          {
                            "tag": "reference",
                            "node": "L65",
                            "index": 1339,
                            "children": []
                          },
                          {
                            "tag": "stitch",
                            "node": "L67",
                            "index": 1373,
                            "children": []
                          },
                          {
                            "tag": "stitch",
                            "node": "L69",
                            "index": 1396,
                            "children": []
                          },
                          {
                            "tag": "declaration",
                            "node": "L70",
                            "index": 1434,
                            "children": []
                          },
                          {
                            "tag": "reference",
                            "node": "L70",
                            "index": 1458,
                            "children": []
                          },
                          {
                            "tag": "stitch",
                            "node": "L72",
                            "index": 1490,
                            "children": []
                          },
                          {
                            "tag": "declaration",
                            "node": "L73",
                            "index": 1517,
                            "children": []
                          },
                          {
                            "tag": "reference",
                            "node": "L73",
                            "index": 1534,
                            "children": []
                          },
                          {
                            "tag": "stitch",
                            "node": "L75",
                            "index": 1559,
                            "children": []
                          },
                          {
                            "tag": "declaration",
                            "node": "L76",
                            "index": 1616,
                            "children": []
                          },
                          {
                            "tag": "reference",
                            "node": "L76",
                            "index": 1641,
                            "children": []
                          },
                          {
                            "tag": "declaration",
                            "node": "L77",
                            "index": 1682,
                            "children": []
                          },
                          {
                            "tag": "reference",
                            "node": "L77",
                            "index": 1700,
                            "children": []
                          },
                          {
                            "tag": "reference",
                            "node": "L78",
                            "index": 1728,
                            "children": []
                          },
                          {
                            "tag": "reference",
                            "node": "L78",
                            "index": 1768,
                            "children": []
                          },
                          {
                            "tag": "stitch",
                            "node": "L80",
                            "index": 1799,
                            "children": []
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "tag": "function",
                "node": "L84",
                "index": 1825,
                "children": [
                  {
                    "tag": "declaration",
                    "node": "L84",
                    "index": 1830,
                    "children": []
                  },
                  {
                    "tag": "parameters",
                    "node": "L84",
                    "index": 1837,
                    "children": []
                  },
                  {
                    "tag": "scope",
                    "node": "L85",
                    "index": 1844,
                    "children": [
                      {
                        "tag": "reference",
                        "node": "L86",
                        "index": 1854,
                        "children": []
                      }
                    ]
                  }
                ]
              },
              {
                "tag": "stitch",
                "node": "L89",
                "index": 1890,
                "children": []
              },
              {
                "tag": "function",
                "node": "L90",
                "index": 1899,
                "children": [
                  {
                    "tag": "declaration",
                    "node": "L90",
                    "index": 1904,
                    "children": []
                  },
                  {
                    "tag": "parameters",
                    "node": "L90",
                    "index": 1920,
                    "children": []
                  },
                  {
                    "tag": "scope",
                    "node": "L91",
                    "index": 1927,
                    "children": [
                      {
                        "tag": "stitch",
                        "node": "L92",
                        "index": 1937,
                        "children": []
                      },
                      {
                        "tag": "declaration",
                        "node": "L93",
                        "index": 1960,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L93",
                        "index": 1977,
                        "children": []
                      },
                      {
                        "tag": "stitch",
                        "node": "L95",
                        "index": 1998,
                        "children": []
                      },
                      {
                        "tag": "declaration",
                        "node": "L96",
                        "index": 2021,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L96",
                        "index": 2032,
                        "children": []
                      },
                      {
                        "tag": "declaration",
                        "node": "L97",
                        "index": 2062,
                        "children": []
                      },
                      {
                        "tag": "declaration",
                        "node": "L98",
                        "index": 2090,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L98",
                        "index": 2102,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L98",
                        "index": 2113,
                        "children": []
                      },
                      {
                        "tag": "stitch",
                        "node": "L100",
                        "index": 2132,
                        "children": []
                      },
                      {
                        "tag": "declaration",
                        "node": "L101",
                        "index": 2168,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L101",
                        "index": 2186,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L102",
                        "index": 2205,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L102",
                        "index": 2218,
                        "children": []
                      },
                      {
                        "tag": "stitch",
                        "node": "L104",
                        "index": 2244,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L105",
                        "index": 2257,
                        "children": []
                      }
                    ]
                  }
                ]
              },
              {
                "tag": "stitch",
                "node": "L108",
                "index": 2279,
                "children": []
              },
              {
                "tag": "function",
                "node": "L109",
                "index": 2288,
                "children": [
                  {
                    "tag": "declaration",
                    "node": "L109",
                    "index": 2293,
                    "children": []
                  },
                  {
                    "tag": "parameters",
                    "node": "L109",
                    "index": 2309,
                    "children": []
                  },
                  {
                    "tag": "scope",
                    "node": "L110",
                    "index": 2316,
                    "children": [
                      {
                        "tag": "stitch",
                        "node": "L111",
                        "index": 2326,
                        "children": []
                      },
                      {
                        "tag": "declaration",
                        "node": "L112",
                        "index": 2350,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L112",
                        "index": 2367,
                        "children": []
                      },
                      {
                        "tag": "stitch",
                        "node": "L114",
                        "index": 2388,
                        "children": []
                      },
                      {
                        "tag": "declaration",
                        "node": "L115",
                        "index": 2412,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L115",
                        "index": 2423,
                        "children": []
                      },
                      {
                        "tag": "declaration",
                        "node": "L116",
                        "index": 2453,
                        "children": []
                      },
                      {
                        "tag": "declaration",
                        "node": "L117",
                        "index": 2482,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L117",
                        "index": 2494,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L117",
                        "index": 2505,
                        "children": []
                      },
                      {
                        "tag": "stitch",
                        "node": "L119",
                        "index": 2524,
                        "children": []
                      },
                      {
                        "tag": "declaration",
                        "node": "L120",
                        "index": 2561,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L120",
                        "index": 2579,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L121",
                        "index": 2598,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L121",
                        "index": 2611,
                        "children": []
                      },
                      {
                        "tag": "stitch",
                        "node": "L123",
                        "index": 2637,
                        "children": []
                      },
                      {
                        "tag": "reference",
                        "node": "L124",
                        "index": 2650,
                        "children": []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      "graphNodes": {
        "1 6": {
          "key": "1 6",
          "coordinates": [
            1,
            6
          ],
          "inputs": [],
          "outputs": [
            {
              "type": "execution",
              "name": "Pressed",
              "link": "3 6"
            },
            {
              "type": "execution",
              "name": "Released",
              "link": "3 11"
            }
          ],
          "title": "Keyboard \\"W\\""
        },
        "1 11": {
          "key": "1 11",
          "coordinates": [
            1,
            11
          ],
          "inputs": [],
          "outputs": [
            {
              "type": "execution",
              "name": "Pressed",
              "link": "3 11"
            },
            {
              "type": "execution",
              "name": "Released",
              "link": "3 6"
            }
          ],
          "title": "Keyboard \\"S\\""
        },
        "3 19": {
          "key": "3 19",
          "coordinates": [
            3,
            19
          ],
          "inputs": [],
          "outputs": [
            {
              "type": "execution",
              "name": "Pressed",
              "link": "4 9 Reset_0"
            },
            {
              "type": "execution",
              "name": "Released"
            }
          ],
          "title": "Keyboard \\"F\\""
        },
        "4 9": {
          "key": "4 9",
          "coordinates": [
            4,
            9
          ],
          "inputs": [
            {
              "type": "execution",
              "name": "Enter",
              "tag": "",
              "link": "4 9 Enter_0"
            },
            {
              "type": "data",
              "name": "n",
              "tag": "Input",
              "default": "20"
            },
            {
              "type": "execution",
              "name": "Reset",
              "tag": "",
              "link": "4 9 Reset_0"
            }
          ],
          "outputs": [
            {
              "type": "data",
              "name": "counter",
              "tag": "",
              "link": "4 9 counter_0"
            },
            {
              "type": "execution",
              "name": "Exit",
              "link": "5 8"
            }
          ],
          "title": "Do N"
        },
        "4 1": {
          "key": "4 1",
          "coordinates": [
            4,
            1
          ],
          "inputs": [],
          "outputs": [
            {
              "type": "data",
              "name": "vehicleMovement",
              "tag": "Pure",
              "link": "4 1 vehicleMovement_0Pure"
            }
          ],
          "title": "m_VehicleMovement"
        },
        "4 4": {
          "key": "4 4",
          "coordinates": [
            4,
            4
          ],
          "inputs": [],
          "outputs": [
            {
              "type": "data",
              "name": "throttle",
              "tag": "Pure",
              "link": "4 4 throttle_0Pure"
            }
          ],
          "title": "m_Throttle"
        },
        "5 8": {
          "key": "5 8",
          "coordinates": [
            5,
            8
          ],
          "inputs": [
            {
              "type": "data",
              "name": "vehicleMovement",
              "tag": "Input",
              "link": "4 1 vehicleMovement_0Pure"
            },
            {
              "type": "data",
              "name": "throttle",
              "tag": "Input",
              "link": "4 4 throttle_0Pure"
            },
            {
              "type": "execution",
              "link": "5 8"
            }
          ],
          "outputs": [
            {
              "type": "execution"
            }
          ],
          "title": "Set Throttle Input"
        },
        "1 1": {
          "key": "1 1",
          "coordinates": [
            1,
            1
          ],
          "inputs": [],
          "outputs": [
            {
              "type": "data",
              "name": "throttle",
              "tag": "Pure",
              "link": "1 1 throttle_0Pure"
            }
          ],
          "title": "m_Throttle"
        },
        "2 1": {
          "key": "2 1",
          "coordinates": [
            2,
            1
          ],
          "inputs": [
            {
              "type": "data",
              "name": "a",
              "tag": "Input",
              "link": "1 1 throttle_0Pure"
            },
            {
              "type": "data",
              "name": "b",
              "tag": "Input",
              "default": "1"
            }
          ],
          "outputs": [
            {
              "type": "data",
              "name": "sum",
              "tag": "Pure",
              "link": "2 1 sum_0Pure"
            }
          ],
          "title": "a + b"
        },
        "3 6": {
          "key": "3 6",
          "coordinates": [
            3,
            6
          ],
          "inputs": [
            {
              "type": "data",
              "name": "throttle",
              "tag": "Input",
              "link": "2 1 sum_0Pure"
            },
            {
              "type": "execution",
              "link": "3 6"
            }
          ],
          "outputs": [
            {
              "type": "execution",
              "link": "4 9 Enter_0"
            }
          ],
          "title": "Set Throttle"
        },
        "1 17": {
          "key": "1 17",
          "coordinates": [
            1,
            17
          ],
          "inputs": [],
          "outputs": [
            {
              "type": "data",
              "name": "throttle",
              "tag": "Pure",
              "link": "1 17 throttle_0Pure"
            }
          ],
          "title": "m_Throttle"
        },
        "2 17": {
          "key": "2 17",
          "coordinates": [
            2,
            17
          ],
          "inputs": [
            {
              "type": "data",
              "name": "a",
              "tag": "Input",
              "link": "1 17 throttle_0Pure"
            },
            {
              "type": "data",
              "name": "b",
              "tag": "Input",
              "default": "-1"
            }
          ],
          "outputs": [
            {
              "type": "data",
              "name": "sum",
              "tag": "Pure",
              "link": "2 17 sum_0Pure"
            }
          ],
          "title": "a + b"
        },
        "3 11": {
          "key": "3 11",
          "coordinates": [
            3,
            11
          ],
          "inputs": [
            {
              "type": "data",
              "name": "throttle",
              "tag": "Input",
              "link": "2 17 sum_0Pure"
            },
            {
              "type": "execution",
              "link": "3 11"
            }
          ],
          "outputs": [
            {
              "type": "execution",
              "link": "4 9 Enter_0"
            }
          ],
          "title": "Set Throttle"
        }
      },
      "graphLinks": {
        "4 9 Enter_0": {
          "type": "execution",
          "origin": {
            "key": "4 9",
            "coordinates": [
              4,
              9
            ],
            "index": 0
          },
          "targets": [
            {
              "key": "3 6",
              "coordinates": [
                3,
                6
              ],
              "index": 0
            },
            {
              "key": "3 11",
              "coordinates": [
                3,
                11
              ],
              "index": 0
            }
          ]
        },
        "4 9 Reset_0": {
          "type": "execution",
          "origin": {
            "key": "4 9",
            "coordinates": [
              4,
              9
            ],
            "index": 2
          },
          "targets": [
            {
              "key": "3 19",
              "coordinates": [
                3,
                19
              ],
              "index": 0
            }
          ]
        },
        "4 9 counter_0": {
          "type": "data",
          "origin": {
            "key": "4 9",
            "coordinates": [
              4,
              9
            ],
            "index": 0
          },
          "targets": []
        },
        "4 1 vehicleMovement_0Pure": {
          "type": "data",
          "origin": {
            "key": "4 1",
            "coordinates": [
              4,
              1
            ],
            "index": 0
          },
          "targets": [
            {
              "key": "5 8",
              "coordinates": [
                5,
                8
              ],
              "index": 0
            }
          ]
        },
        "4 4 throttle_0Pure": {
          "type": "data",
          "origin": {
            "key": "4 4",
            "coordinates": [
              4,
              4
            ],
            "index": 0
          },
          "targets": [
            {
              "key": "5 8",
              "coordinates": [
                5,
                8
              ],
              "index": 1
            }
          ]
        },
        "5 8": {
          "type": "execution",
          "origin": {
            "key": "5 8",
            "coordinates": [
              5,
              8
            ],
            "index": 2
          },
          "targets": [
            {
              "key": "4 9",
              "coordinates": [
                4,
                9
              ],
              "index": 1
            }
          ]
        },
        "1 1 throttle_0Pure": {
          "type": "data",
          "origin": {
            "key": "1 1",
            "coordinates": [
              1,
              1
            ],
            "index": 0
          },
          "targets": [
            {
              "key": "2 1",
              "coordinates": [
                2,
                1
              ],
              "index": 0
            }
          ]
        },
        "2 1 sum_0Pure": {
          "type": "data",
          "origin": {
            "key": "2 1",
            "coordinates": [
              2,
              1
            ],
            "index": 0
          },
          "targets": [
            {
              "key": "3 6",
              "coordinates": [
                3,
                6
              ],
              "index": 0
            }
          ]
        },
        "3 6": {
          "type": "execution",
          "origin": {
            "key": "3 6",
            "coordinates": [
              3,
              6
            ],
            "index": 1
          },
          "targets": [
            {
              "key": "1 6",
              "coordinates": [
                1,
                6
              ],
              "index": 0
            },
            {
              "key": "1 11",
              "coordinates": [
                1,
                11
              ],
              "index": 1
            }
          ]
        },
        "1 17 throttle_0Pure": {
          "type": "data",
          "origin": {
            "key": "1 17",
            "coordinates": [
              1,
              17
            ],
            "index": 0
          },
          "targets": [
            {
              "key": "2 17",
              "coordinates": [
                2,
                17
              ],
              "index": 0
            }
          ]
        },
        "2 17 sum_0Pure": {
          "type": "data",
          "origin": {
            "key": "2 17",
            "coordinates": [
              2,
              17
            ],
            "index": 0
          },
          "targets": [
            {
              "key": "3 11",
              "coordinates": [
                3,
                11
              ],
              "index": 0
            }
          ]
        },
        "3 11": {
          "type": "execution",
          "origin": {
            "key": "3 11",
            "coordinates": [
              3,
              11
            ],
            "index": 1
          },
          "targets": [
            {
              "key": "1 6",
              "coordinates": [
                1,
                6
              ],
              "index": 1
            },
            {
              "key": "1 11",
              "coordinates": [
                1,
                11
              ],
              "index": 0
            }
          ]
        }
      }
    }"
  `,
  )
})
