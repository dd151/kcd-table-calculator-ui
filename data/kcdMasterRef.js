export default [{
        "signLengths": {
            "Ar": 7,
            "Ta": 16,
            "Ge": 9,
            "Cn": 21,
            "Le": 5,
            "Vi": 9,
            "Li": 16,
            "Sc": 7,
            "Sg": 10,
            "Cp": 4,
            "Aq": 4,
            "Pi": 10
        }
    },
    {
        "mdLengths": {
            "Ar": 100,
            "Ta": 85,
            "Ge": 83,
            "Cn": 86,
            "Le": 100,
            "Vi": 85,
            "Li": 83,
            "Sc": 86,
            "Sg": 100,
            "Cp": 85,
            "Aq": 83,
            "Pi": 86
        }
    },
    {
        "Ar": ["Ar.qj*.qj", "Ta.na.na", "Ge.na.na", "Cn.na.na", "Le.na.na", "Vi.na.na", "Li.na.na", "Sc.na.na", "Sg.na.na"],
        "Ta": ["Cp.na.na", "Aq.na.na", "Pi.qj.qj*", "Sc.qj*.qj", "Li.na.na", "Vi.na.ff", "Cn.ff.re", "Le.re.ff", "Ge.ff.na"],
        "Ge": ["Ta.na.na", "Ar.na.na", "Pi.na.na", "Aq.na.na", "Cp.na.na", "Sg.qj.qj*", "Ar.qj*.qj", "Ta.na.na", "Ge.na.na"],
        "Cn": ["Cn.na.na", "Le.na.na", "Vi.na.na", "Li.na.na", "Sc.na.na", "Sg.na.na", "Cp.na.na", "Aq.na.na", "Pi.qj.qj*"],
        "Le": ["Sc.qj*.qj", "Li.na.na", "Vi.na.ff", "Cn.ff.re", "Le.re.ff", "Ge.ff.na", "Ta.na.na", "Ar.na.na", "Pi.na.na"],
        "Vi": ["Aq.na.na", "Cp.na.na", "Sg.qj.qj*", "Ar.qj*.qj", "Ta.na.na", "Ge.na.na", "Cn.na.na", "Le.na.na", "Vi.na.na"],
        "Li": ["Li.na.na", "Sc.na.na", "Sg.na.na", "Cp.na.na", "Aq.na.na", "Pi.qj.qj*", "Sc.qj*.qj", "Li.na.na", "Vi.na.ff"],
        "Sc": ["Cn.ff.re", "Le.re.ff", "Ge.ff.na", "Ta.na.na", "Ar.na.na", "Pi.na.na", "Aq.na.na", "Cp.na.na", "Sg.qj.qj*"],
        "Sg": ["Ar.qj*.qj", "Ta.na.na", "Ge.na.na", "Cn.na.na", "Le.na.na", "Vi.na.na", "Li.na.na", "Sc.na.na", "Sg.na.na"],
        "Cp": ["Cp.na.na", "Aq.na.na", "Pi.qj.qj*", "Sc.qj*.qj", "Li.na.na", "Vi.na.ff", "Cn.ff.re", "Le.re.ff", "Ge.ff.na"],
        "Aq": ["Ta.na.na", "Ar.na.na", "Pi.na.na", "Aq.na.na", "Cp.na.na", "Sg.qj.qj*", "Ar.qj*.qj", "Ta.na.na", "Ge.na.na"],
        "Pi": ["Cn.na.na", "Le.na.na", "Vi.na.na", "Li.na.na", "Sc.na.na", "Sg.na.na", "Cp.na.na", "Aq.na.na", "Pi.na.na"]

    },
    {
        "dp": "savya",
        "collections": [{
                "naks": ["Asw", "Pun", "Has", "Moo", "PBh"],
                "padas": [
                    [1, "Ar", "Ar1", "Ta1", "Ge1", "Cn1", "Le1", "Vi1", "Li1", "Sc1", "Sg1"],
                    [2, "Ta", "Cp1", "Aq1", "Pi1", "Sc0", "Li0", "Vi0", "Cn0", "Le0", "Ge0"],
                    [3, "Ge", "Ta0", "Ar0", "Pi0", "Aq0", "Cp0", "Sg0", "Ar1", "Ta1", "Ge1"],
                    [4, "Cn", "Cn1", "Le1", "Vi1", "Li1", "Sc1", "Sg1", "Cp1", "Aq1", "Pi1"]
                ]
            },
            {
                "naks": ["Bha", "Pus", "Chi", "PAs", "UBh"],
                "padas": [
                    [1, "Le", "Sc0", "Li0", "Vi0", "Cn0", "Le0", "Ge0", "Ta0", "Ar0", "Pi0"],
                    [2, "Vi", "Aq0", "Cp0", "Sg0", "Ar1", "Ta1", "Ge1", "Cn1", "Le1", "Vi1"],
                    [3, "Li", "Li1", "Sc1", "Sg1", "Cp1", "Aq1", "Pi1", "Sc0", "Li0", "Vi0"],
                    [4, "Sc", "Cn0", "Le0", "Ge0", "Ta0", "Ar0", "Pi0", "Aq0", "Cp0", "Sg0"]
                ]
            },
            {
                "naks": ["Kri", "Ash", "Swa", "UAs", "Rev"],
                "padas": [
                    [1, "Sg", "Ar1", "Ta1", "Ge1", "Cn1", "Le1", "Vi1", "Li1", "Sc1", "Sg1"],
                    [2, "Cp", "Cp1", "Aq1", "Pi1", "Sc0", "Li0", "Vi0", "Cn0", "Le0", "Ge0"],
                    [3, "Aq", "Ta0", "Ar0", "Pi0", "Aq0", "Cp0", "Sg0", "Ar1", "Ta1", "Ge1"],
                    [4, "Pi", "Cn1", "Le1", "Vi1", "Li1", "Sc1", "Sg1", "Cp1", "Aq1", "Pi1"]
                ]
            }
        ]
    }, {
        "dp": "asavya",
        "collections": [{
                "naks": ["Mri", "PPh", "Anu", "Dha"],
                "padas": [
                    [1, "Cn", "Pi0", "Aq0", "Cp0", "Sg0", "Sc0", "Li0", "Vi0", "Le0", "Cn0"],
                    [2, "Ge", "Ge0", "Ta0", "Ar0", "Sg1", "Cp1", "Aq1", "Pi1", "Ar1", "Ta1"],
                    [3, "Ta", "Ge1", "Le1", "Cn1", "Vi1", "Li1", "Sc1", "Pi0", "Aq0", "Cp0"],
                    [4, "Ar", "Sg0", "Sc0", "Li0", "Vi0", "Le0", "Cn0", "Ge0", "Ta0", "Ar0"]
                ]
            },
            {
                "naks": ["Roh", "Mag", "Vis", "Shr"],
                "padas": [
                    [1, "Sc", "Sg1", "Cp1", "Aq1", "Pi1", "Ar1", "Ta1", "Ge1", "Le1", "Cn1"],
                    [2, "Li", "Vi1", "Li1", "Sc1", "Pi0", "Aq0", "Cp0", "Sg0", "Sc0", "Li0"],
                    [3, "Vi", "Vi0", "Le0", "Cn0", "Ge0", "Ta0", "Ar0", "Sg1", "Cp1", "Aq1"],
                    [4, "Le", "Pi1", "Ar1", "Ta1", "Ge1", "Le1", "Cn1", "Vi1", "Li1", "Sc1"]
                ]
            },
            {
                "naks": ["Ard", "UPh", "Jye", "Sat"],
                "padas": [
                    [1, "Pi", "Pi0", "Aq0", "Cp0", "Sg0", "Sc0", "Li0", "Vi0", "Le0", "Cn0"],
                    [2, "Aq", "Ge0", "Ta0", "Ar0", "Sg1", "Cp1", "Aq1", "Pi1", "Ar1", "Ta1"],
                    [3, "Cp", "Ge1", "Le1", "Cn1", "Vi1", "Li1", "Sc1", "Pi0", "Aq0", "Cp0"],
                    [4, "Sg", "Sg0", "Sc0", "Li0", "Vi0", "Le0", "Cn0", "Ge0", "Ta0", "Ar0"]
                ]
            }
        ]
    }
]