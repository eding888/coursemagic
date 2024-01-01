//Create sql helper method to access elephantSQL database using postgres node module
import postgres, { Sql } from "postgres";
let url = Bun.env.RUN === "test" ? Bun.env.TEST_POSTGRES_URL || "" : Bun.env.POSTGRES_URL || "";

// Sql helper function
const sql: Sql = postgres(url, {
  idle_timeout: 10
});
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