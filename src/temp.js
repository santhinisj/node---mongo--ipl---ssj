// { $match: { season: 2016 } },
// {
//     $lookup: {
//         from: 'deliveries',
//         localField: 'id',
//         foreignField: 'match_id',
//         as: 'details'
//     }
// }, {
//     $project: {
//         details: { bowling_team: 1, extra_runs: 1, wide_runs: 1, noball_runs: 1 }
//     }
// }, { $unwind: '$details' }, {
//     $group: {
//         _id: '$details.bowling_team',
//         extraRuns: { $sum: '$details.extra_runs' },
//         balls: { $sum: 1 },
//         wideBalls: { $sum: { $cond: { if: { $ne: ["$details.wide_runs", 0] }, then: 1, else: 0 } } },
//         noBalls: { $sum: { $cond: { if: { $ne: ["$details.noball_runs", 0] }, then: 1, else: 0 } } }
//     }
// }, {
//     $project: {
//         _id: '$_id',
//         balls: {
//             $subtract: ['$balls', {
//                 $add: ['$wideBalls', '$noBalls']

//             }]
//         }
//     }
// }

, {
    $project: {
        _id: '$_id',
        economy: {
            $divide: ['$totalRuns', {
                $divide: [{
                    $subtract: ['$balls', {
                        $add: ['$wideBalls', '$noBalls']

                    }]
                }, 6]
            }]
        }


    }
}, { $sort: { economy: 1 } }