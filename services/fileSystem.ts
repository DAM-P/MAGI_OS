
import { FileNode } from '../types';

export const MOCK_FILE_SYSTEM: FileNode = {
  id: 'root',
  name: 'ROOT',
  type: 'DIR',
  children: [
    {
      id: 'nerv',
      name: 'NERV_DATABANK',
      type: 'DIR',
      date: '2015-06-22',
      securityLevel: 'LEVEL 5',
      children: [
        {
          id: 'personnel',
          name: 'PERSONNEL',
          type: 'DIR',
          date: '2015-09-01',
          children: [
            { id: 'p1', name: 'IKARI_G.biodata', type: 'FILE', size: '42KB', date: '2010-01-14', content: "NAME: IKARI GENDO\nROLE: SUPREME COMMANDER\nSTATUS: ACTIVE\nCLEARANCE: LEVEL 5 (UNLIMITED)\n\nNOTES:\n- RELATIONSHIP WITH SEELE: STRAINED\n- HUMAN INSTRUMENTALITY PROJECT: PROCEEDING AS PLANNED\n- DO NOT DISTURB DURING 'SCENARIO' UPDATES." },
            { id: 'p2', name: 'KATSURAGI_M.biodata', type: 'FILE', size: '38KB', date: '2014-12-10', content: "NAME: KATSURAGI MISATO\nROLE: TACTICAL OPERATIONS DIRECTOR\nRANK: MAJOR (PROMOTED)\nSTATUS: ACTIVE\n\nPSYCHOLOGICAL PROFILE:\n- SURVIVOR OF SECOND IMPACT\n- TENDENCY FOR RECKLESS TACTICS\n- ALCOHOL CONSUMPTION: HIGH\n- GUARDIAN FOR THIRD CHILD." },
            { id: 'p3', name: 'AYANAMI_R.biodata', type: 'FILE', size: '12KB', date: '2015-01-01', content: "NAME: AYANAMI REI\nROLE: FIRST CHILD / PILOT UNIT-00\nBLOOD TYPE: BLUE PATTERN (?)\nSTATUS: ACTIVE\n\nMEDICAL RECORDS:\n- MULTIPLE REGENERATIVE TREATMENTS ADMINISTERED\n- LCL COMPATIBILITY: 100%\n- DATA CORRUPTED..." },
            { id: 'p4', name: 'SORYU_A_L.biodata', type: 'FILE', size: '45KB', date: '2015-09-20', content: "NAME: SORYU ASUKA LANGLEY\nROLE: SECOND CHILD / PILOT UNIT-02\nORIGIN: GERMANY BRANCH\nSTATUS: ACTIVE\n\nNOTES:\n- HIGH SYNCHRONIZATION POTENTIAL\n- PRONE TO INSUBORDINATION\n- FIXATION ON UNIT-02." },
            { id: 'p5', name: 'IKARI_S.biodata', type: 'FILE', size: '20KB', date: '2015-06-01', content: "NAME: IKARI SHINJI\nROLE: THIRD CHILD / PILOT UNIT-01\nSTATUS: ACTIVE\n\nNOTES:\n- RECRUITED UNDER EMERGENCY ORDINANCE D-17\n- INITIAL SYNC RATE: 41.3% (UNPRECEDENTED)\n- MENTAL STABILITY: MONITOR CLOSELY." },
            { id: 'p6', name: 'RYOJI_K.voice', type: 'FILE', size: '14MB', date: '2015-10-20', content: "[AUDIO TRANSCRIPT]\n\n'Yo, Katsuragi. If you're listening to this, I probably messed up. The truth about Second Impact... it's not what they told us. It wasn't a meteor. It was Adam. I'm leaving the capsule with you. Do what you want with it. Bye.'" },
            { id: 'p7', name: 'AKAGI_R.biodata', type: 'FILE', size: '35KB', date: '2015-01-10', content: "NAME: AKAGI RITSUKO\nROLE: CHIEF SCIENTIST\nSTATUS: ACTIVE\n\nNOTES:\n- MAINTENANCE OF MAGI SYSTEM\n- OVERSIGHT OF PROJECT E\n- PERSONALITY CONFLICTS WITH MAJOR KATSURAGI OBSERVED." },
            { id: 'p8', name: 'FUYUTSUKI_K.biodata', type: 'FILE', size: '40KB', date: '2010-02-15', content: "NAME: FUYUTSUKI KOZO\nROLE: DEPUTY COMMANDER\nSTATUS: ACTIVE\n\nBACKGROUND:\n- FORMER PROFESSOR OF METAPHYSICAL BIOLOGY\n- MENTOR TO YUI IKARI\n- ONLY CONFIDANT OF COMMANDER IKARI." },
          ]
        },
        {
          id: 'angels',
          name: 'ANGEL_RECORDS',
          type: 'DIR',
          date: '2015-12-30',
          securityLevel: 'TOP SECRET',
          children: [
            { id: 'a03', name: '03_SACHIEL.rep', type: 'FILE', size: '15MB', date: '2015-06-22', content: "CODENAME: SACHIEL\nTYPE: 3RD ANGEL\nAPPEARANCE: AMPHIBIOUS HUMANOID\n\nBATTLE ANALYSIS:\n- FIRST ENGAGEMENT IN 15 YEARS\n- N2 MINE EFFECTIVENESS: NEGLIGIBLE\n- DEFEATED BY: UNIT-01 (BERSERK STATE)" },
            { id: 'a04', name: '04_SHAMSHEL.rep', type: 'FILE', size: '18MB', date: '2015-07-05', content: "CODENAME: SHAMSHEL\nTYPE: 4TH ANGEL\nAPPEARANCE: ARTHROPOD-LIKE\nWEAPON: LIGHT WHIPS\n\nSTATUS: TERMINATED\nCORE: RECOVERED INTACT (CRITICAL)" },
            { id: 'a05', name: '05_RAMIEL.rep', type: 'FILE', size: '40MB', date: '2015-07-20', content: "CODENAME: RAMIEL\nTYPE: 5TH ANGEL\nAPPEARANCE: GEOMETRIC (OCTAHEDRON)\nCAPABILITIES: PARTICLE BEAM, DRILL\n\nDEFEATED BY: POSITRON SNIPER RIFLE (OP. YASHIMA)" },
            { id: 'a06', name: '06_GAGHIEL.rep', type: 'FILE', size: '12MB', date: '2015-08-10', content: "CODENAME: GAGHIEL\nTYPE: 6TH ANGEL\nAPPEARANCE: AQUATIC\n\nDEFEATED BY: UNIT-02 (JOINT OPERATION WITH UN NAVY)" },
            { id: 'a07', name: '07_ISRAFEL.rep', type: 'FILE', size: '22MB', date: '2015-09-11', content: "CODENAME: ISRAFEL\nTYPE: 7TH ANGEL\nABILITY: MITOSIS (SPLIT INTO TWO)\n\nDEFEATED BY: SYNCHRONIZED ATTACK (UNIT-01 & UNIT-02)" },
            { id: 'a08', name: '08_SANDALPHON.rep', type: 'FILE', size: '19MB', date: '2015-09-30', content: "CODENAME: SANDALPHON\nTYPE: 8TH ANGEL\nFOUND: MAGMA DIVER (MT. ASAMA)\n\nDEFEATED BY: UNIT-02 (THERMAL EXPANSION TRAP)" },
            { id: 'a09', name: '09_MATARAEL.rep', type: 'FILE', size: '14MB', date: '2015-10-05', content: "CODENAME: MATARAEL\nTYPE: 9TH ANGEL\nAPPEARANCE: SPIDER-LIKE\nABILITY: ACID SECRETION\n\nDEFEATED BY: COORDINATED FIRETEAM (UNITS 00, 01, 02)" },
            { id: 'a10', name: '10_SAHAQUIEL.rep', type: 'FILE', size: '30MB', date: '2015-10-25', content: "CODENAME: SAHAQUIEL\nTYPE: 10TH ANGEL\nSTRATEGY: ORBITAL BOMBARDMENT (ITSELF)\n\nDEFEATED BY: A.T. FIELD INTERCEPTION (ALL UNITS)" },
            { id: 'a11', name: '11_IREUL.rep', type: 'FILE', size: '100MB', date: '2015-11-10', content: "CODENAME: IREUL\nTYPE: 11TH ANGEL\nFORM: NANO-SCALE COLONY\nTARGET: MAGI SYSTEM\n\nDEFEATED BY: SELF-DESTRUCT CODE INJECTION (CASPER NODE)" },
            { id: 'a12', name: '12_LELIEL.rep', type: 'FILE', size: '45MB', date: '2015-12-04', content: "CODENAME: LELIEL\nTYPE: 12TH ANGEL\nAPPEARANCE: SHADOW SPHERE (DIRAC SEA)\n\nDEFEATED BY: UNIT-01 (INTERNAL BREAKOUT)" },
          ]
        },
        {
          id: 'projects',
          name: 'PROJECT_E',
          type: 'DIR',
          date: '2000-09-13',
          securityLevel: 'TOP SECRET',
          children: [
             { id: 'e_spec', name: 'EVA_GENERAL_SPECS.doc', type: 'FILE', size: '20MB', date: '2004-01-01', content: "MULTIPURPOSE HUMANOID DECISIVE WEAPON: EVANGELION\n\nPOWER SOURCE: UMBILICAL CABLE (EXTERNAL), INTERNAL BATTERY (5 MIN)\nCONTROL SYSTEM: NEURAL LINK VIA A10 NERVE CONNECTION\nARMOR: RESTRAINTS (TO SUPPRESS POWER, NOT PROTECT)" },
            { id: 'eva00', name: 'UNIT_00_PROTO.log', type: 'FILE', size: '156MB', date: '2004-08-01', content: "UNIT: EVA-00 (PROTOTYPE)\nPILOT: AYANAMI REI\nCOLOR: YELLOW (ORIGINAL) -> BLUE (REFIT)\n\nINCIDENT REPORT:\n- ACTIVATION TEST FAILED\n- PILOT EJECTED AUTOMATICALLY\n- MENTAL CONTAMINATION DETECTED IN MAGI SYSTEM." },
            { id: 'eva01', name: 'UNIT_01_TEST.log', type: 'FILE', size: '204MB', date: '2004-10-12', content: "UNIT: EVA-01 (TEST TYPE)\nPILOT: IKARI SHINJI\nSOUL: [REDACTED]\n\nPERFORMANCE:\n- SYNCHRONIZATION RATE: 41.3%\n- BERSERK INCIDENT REPORT: UNIT MOVED WITHOUT POWER.\n- S2 ENGINE: ACQUIRED VIA CONSUMPTION OF ANGEL." },
            { id: 'eva02', name: 'UNIT_02_PROD.log', type: 'FILE', size: '180MB', date: '2005-01-01', content: "UNIT: EVA-02 (PRODUCTION MODEL)\nPILOT: SORYU ASUKA LANGLEY\nORIGIN: GERMANY\n\nSPECS:\n- FIRST UNIT BUILT FOR COMBAT\n- PROGRESSIVE KNIFE TYPE: PK-02\n- UNDERWATER EQUIPMENT COMPATIBLE." },
            { id: 'eva03', name: 'UNIT_03_PRODUCTION.log', type: 'FILE', size: '170MB', date: '2015-09-11', content: "UNIT: EVA-03 (PRODUCTION MODEL)\nPILOT: TOJI SUZUHARA (4TH CHILD)\nORIGIN: NERV-01 (USA)\n\nSTATUS: DESTROYED\nINCIDENT: INFECTED BY 13TH ANGEL (BARDIEL) DURING TRANSPORT.\nRESULT: TARGET SILENCED BY UNIT-01 (DUMMY PLUG SYSTEM)." },
            { id: 'eva04', name: 'UNIT_04_DISASTER.log', type: 'FILE', size: '12KB', date: '2015-10-01', content: "UNIT: EVA-04 (PRODUCTION MODEL)\nORIGIN: NERV-02 (NEVADA, USA)\nPOWER: EXPERIMENTAL S2 ENGINE\n\nSTATUS: LOST\nINCIDENT: DISAPPEARED WITHIN DIRAC SEA RADIUS OF 89KM ALONG WITH THE ENTIRE FACILITY.\nCAUSE: S2 ENGINE CRITICALITY FAILURE." },
            { id: 'mp_series', name: 'MASS_PROD_SERIES', type: 'DIR', date: '2016-01-01', securityLevel: 'SEELE EYES ONLY', children: [
                 { id: 'mp_spec', name: 'MP_EVA_SPECS.doc', type: 'FILE', size: '50MB', date: '2016-01-01', content: "SERIES: EVA-05 THRU EVA-13 (E SERIES)\nMANUFACTURER: SEELE (VARIOUS BRANCHES)\nPILOT: DUMMY PLUG (KAWORU BASE)\n\nFEATURES:\n- S2 ENGINE EQUIPPED (UNLIMITED RANGE)\n- WINGS (FLIGHT CAPABLE)\n- WEAPON: HEAVY LANCE (REPLICA LONGINUS)\n- REGENERATION: EXTREME." },
                 { id: 'mp_05', name: 'UNIT_05.stat', type: 'FILE', size: '2KB', date: '2016-01-01', content: "STATUS: ACTIVE\nLOCATION: ORBITAL STANDBY\nTARGET: GEOFRONT" },
                 { id: 'mp_06', name: 'UNIT_06.stat', type: 'FILE', size: '2KB', date: '2016-01-01', content: "STATUS: ACTIVE\nLOCATION: NERV-GERMANY (TRANSPORTING)" },
                 { id: 'mp_07', name: 'UNIT_07.stat', type: 'FILE', size: '2KB', date: '2016-01-01', content: "STATUS: ACTIVE\nLOCATION: NERV-CHINA" },
                 { id: 'mp_08', name: 'UNIT_08.stat', type: 'FILE', size: '2KB', date: '2016-01-01', content: "STATUS: ACTIVE\nLOCATION: NERV-RUSSIA" },
                 { id: 'mp_09', name: 'UNIT_09.stat', type: 'FILE', size: '2KB', date: '2016-01-01', content: "STATUS: ACTIVE\nLOCATION: NERV-USA" },
                 { id: 'mp_10', name: 'UNIT_10.stat', type: 'FILE', size: '2KB', date: '2016-01-01', content: "STATUS: ACTIVE\nLOCATION: [REDACTED]" },
                 { id: 'mp_11', name: 'UNIT_11.stat', type: 'FILE', size: '2KB', date: '2016-01-01', content: "STATUS: ACTIVE\nLOCATION: [REDACTED]" },
                 { id: 'mp_12', name: 'UNIT_12.stat', type: 'FILE', size: '2KB', date: '2016-01-01', content: "STATUS: ACTIVE\nLOCATION: [REDACTED]" },
                 { id: 'mp_13', name: 'UNIT_13_MP.stat', type: 'FILE', size: '2KB', date: '2016-01-01', content: "STATUS: ACTIVE\nLOCATION: [REDACTED]\nNOTE: FINAL MASS PRODUCTION UNIT." }
            ]},
            { id: 'eva13_x', name: 'UNIT_13_FINAL.prop', type: 'FILE', size: '666MB', date: '2016-01-01', content: "UNIT: EVA-13 (FINAL EXECUTOR)\nTYPE: ADAMS' VESSEL (DISTINCT FROM MP SERIES)\nPILOT SYSTEM: DOUBLE ENTRY\n\nNOTES:\n- DESIGNED FOR FOURTH IMPACT\n- DUAL SPEARS OF LONGINUS CAPABILITY\n- NO A.T. FIELD (GENERATED BY SENTINELS)\n- STATUS: CONSTRUCTION INCOMPLETE." },
             { id: 'dummy', name: 'DUMMY_PLUG.sys', type: 'FILE', size: '2GB', date: '2015-09-01', content: "SYSTEM: DUMMY PLUG\nBASE: DATA PATTERN 'REI'\nPURPOSE: UNMANNED OPERATION OF EVANGELION UNITS\n\nETHICAL REVIEW:\n- REJECTED BY RITSUKO AKAGI (INITIALLY)\n- APPROVED BY GENDO IKARI\n- STATUS: OPERATIONAL IN UNIT-01 (SANS PILOT CONSENT)." }
          ]
        },
        {
          id: 'marduk',
          name: 'MARDUK_INSTITUTE',
          type: 'DIR',
          date: '2014-04-01',
          securityLevel: 'LEVEL 4',
          children: [
            { id: 'md1', name: 'PILOT_SELECTION_ALGO.doc', type: 'FILE', size: '10MB', date: '2014-02-15', content: "METHODOLOGY: CORE COMPATIBILITY SCAN\nTARGET DEMOGRAPHIC: 14-YEAR-OLDS (BORN DURING SECOND IMPACT)\nCLASS 2-A: ALL STUDENTS ARE CANDIDATES.\n\nNOTE: THE INSTITUTE ITSELF IS A FRONT ORGANIZATION." },
            { id: 'md2', name: 'CLASS_2A_LIST.xls', type: 'FILE', size: '5KB', date: '2015-04-01', content: "SUZUHARA TOJI - 4TH CHILD (SELECTED)\nAIDA KENSUKE - RESERVE\nHIKARI HORAKI - RESERVE\n..." }
          ]
        },
        {
          id: 'technical',
          name: 'TECHNICAL_DATA',
          type: 'DIR',
          date: '2015-01-01',
          securityLevel: 'LEVEL 4',
          children: [
             { id: 'at_field', name: 'AT_FIELD_THEORY.pdf', type: 'FILE', size: '5MB', date: '2005-06-15', content: "ABSOLUTE TERROR FIELD\n\nDEFINITION: THE PHYSICAL MANIFESTATION OF THE SOUL / EGO BARRIER.\nFUNCTION: SEPARATES INDIVIDUALS.\nWEAPONIZATION: CAN BE NEUTRALIZED BY ANOTHER AT FIELD (PHASE SPACE INVASION)." },
             { id: 'lcl', name: 'LCL_COMPOSITION.chem', type: 'FILE', size: '2MB', date: '2004-02-20', content: "LINK CONNECTED LIQUID\n\nPROPERTIES:\n- OXYGENATED PERFLUOROCARBON\n- PHASE CHANGE UPON ELECTRICAL CHARGE\n- SCENT: BLOOD (?)\nSOURCE: TERMINAL DOGMA (LILITH)." },
             { id: 's2', name: 'S2_ENGINE.theory', type: 'FILE', size: '100MB', date: '2000-10-01', content: "SUPER SOLENOID ENGINE\n\nORIGIN: ANGELS\nCAPABILITY: UNLIMITED ENERGY GENERATION WITHOUT EXTERNAL POWER.\nGOAL: ARTIFICIAL RECREATION FOR EVA SERIES (EVA-04 EXPERIMENT FAILED)." },
             { id: 'jet_alone', name: 'JA_SABOTAGE.log', type: 'FILE', size: '80KB', date: '2015-08-05', content: "TARGET: JET ALONE (JAPAN HEAVY CHEMICAL IND.)\nACTION: CONTROL ROD PURGE INHIBITION\nEXECUTOR: RITSUKO AKAGI\nPURPOSE: ENSURE NERV SUPREMACY IN DEFENSE CONTRACTS." }
          ]
        },
        {
          id: 'magi_int',
          name: 'MAGI_INTERNAL',
          type: 'DIR',
          date: '2010-05-30',
          securityLevel: 'MAGI ONLY',
          children: [
            { id: 'm1', name: 'CASPER_TRANSCRIPT.txt', type: 'FILE', size: '2MB', date: '2010-06-01', content: "CREATOR: DR. NAOKO AKAGI\n\nI wanted to live as a scientist, as a mother, and as a woman. But in the end... Gendo used me. They are all just copies of me. Casper holds my heart as a woman. That is why she will betray him in the end." },
            { id: 'm2', name: 'OS_KERNEL.patch', type: 'FILE', size: '1.2GB', date: '2015-10-04', content: "Patch 777: Security vulnerability in Melchior module fixed. Ireul virus definitions updated." },
            { id: 'm3', name: 'SELF_DESTRUCT.code', type: 'FILE', size: '1KB', date: '2015-12-31', content: "EMERGENCY OVERRIDE CODE: \n\n[ENCRYPTED]\nREQ: UNANIMOUS VOTE FROM ALL THREE MAGI NODES." }
          ]
        },
        {
          id: 'blackbox',
          name: 'BLACK_BOX',
          type: 'DIR',
          date: '2000-09-13',
          securityLevel: 'EYES ONLY',
          children: [
            { id: 'h1', name: 'SECOND_IMPACT_TRUTH.doc', type: 'FILE', size: '500MB', date: '2000-09-14', content: "DATE: SEPTEMBER 13, 2000\nLOCATION: ANTARCTICA\nOFFICIAL STORY: METEORITE IMPACT\nACTUAL CAUSE: CONTACT EXPERIMENT WITH ADAM.\nRESULT: DNA DIVE, ANTI-AT FIELD EXPANSION, GLOBAL PURIFICATION." },
            { id: 'h2', name: 'HUMAN_INSTRUMENTALITY.plan', type: 'FILE', size: '1GB', date: '2001-01-01', content: "PROJECT: INSTRUMENTALITY\nGOAL: ARTIFICIAL EVOLUTION OF HUMANITY INTO A SINGLE ENTITY.\nMETHOD: THIRD IMPACT VIA EVA SERIES AND LILITH.\nSEELE SCENARIO VS IKARI SCENARIO: DIVERGENCE DETECTED." },
            { id: 'h3', name: 'ADAM_EMBRYO.cargo', type: 'FILE', size: '50KB', date: '2015-03-15', content: "MANIFEST: RY-772\nCONTENTS: BAKELITE SAMPLE\nORIGIN: ANTARCTICA\nCURRENT LOCATION: COMMANDER IKARI'S HAND (IMPLANTED)." },
            { id: 'h4', name: 'LILITH_ORIGIN.txt', type: 'FILE', size: '12KB', date: '2000-01-01', content: "SOURCE: BLACK MOON (HAKONE)\nDESIGNATION: 2ND ANGEL\nSTATUS: CRUCIFIED IN TERMINAL DOGMA\nKEY: LANCE OF LONGINUS REQUIRED FOR CONTROL." }
          ]
        },
        {
          id: 'seele',
          name: 'SEELE_ARCHIVES',
          type: 'DIR',
          date: '1947-01-01',
          securityLevel: 'ULTRA SECRET',
          children: [
            { id: 's01', name: 'DEAD_SEA_SCROLLS.trans', type: 'FILE', size: '500MB', date: '1947-02-14', content: "PROPHECY: THE ANGELS WILL RETURN.\nNUMBER: 17\nTHE PACT: HUMANITY MUST SURVIVE TO BECOME GOD.\n..." },
            { id: 's02', name: 'COMMITTEE_MINUTES.log', type: 'FILE', size: '50MB', date: '2015-11-20', content: "CHAIRMAN KEEL LORENZ: 'IKARI IS MOVING TOO SLOWLY.'\nDECISION: ACCELERATE MASS PRODUCTION EVA SERIES (05-13).\nBUDGET: UNLIMITED." }
          ]
        }
      ]
    }
  ]
};
