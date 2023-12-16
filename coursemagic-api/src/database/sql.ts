//Create sql helper method to access elephantSQL database using postgres node module
import postgres, { Sql } from "postgres";
let url = Bun.env.RUN === "test" ? Bun.env.TEST_POSTGRES_URL || "" : Bun.env.POSTGRES_URL || "";

// The great sql helper funciton is born!!
const sql: Sql = postgres(url);
export default sql;

/*
                       __________________________
               __..--/".'                        '.
       __..--""      | |                          |
      /              | |                          |
     /               | |    ___________________   |
    ;                | |   :__________________/:  |
    |                | |   |                 '.|  |
    |                | |   |                  ||  |
    |                | |   |   Affirmation:   ||  |
    |                | |   |   I love sql     ||  |
    |                | |   |                  ||  |
    |                | |   |                  ||  |
    |                | |   |                  ||  |
    |                | |   |                  ||  |
    |                | |   |______......-----"\|  |
    |                | |   |_______......-----"   |
    |                | |                          |
    |                | |                          |
    |                | |                  ____----|
    |                | |_____.....----|#######|---|
    |                | |______.....----""""       |
    |                | |                          |
    |. ..            | |   ,                      |
    |... ....        | |  (c ----- """           .'
    |..... ......  |\|_|    ____......------"""|"
    |. .... .......| |""""""                   |
    '... ..... ....| |                         |
      "-._ .....  .| |                         |
          "-._.....| |             ___...---"""'
              "-._.| | ___...---"""
                  """""


*/