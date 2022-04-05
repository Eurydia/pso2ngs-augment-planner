import { Component } from "react";

class About extends Component<{}, {}> {
    render() {
        return (
            <div className="container p-8 grid gap-4 bg-white/80 rounded-lg shadow-lg shadow-grey-500/80 normal-case">
                <div className="grid gap-2">
                    <div className="text-xl font-bold">About:</div>
                    <div className="text-lg">
                        This project takes a lot of inspiration from{" "}
                        <a href="https://docs.google.com/spreadsheets/d/1ShT8I1wj9mGh-hGXqF0j9tvUU_jkYLvGd4gPZjNzRpo/edit#gid=0">
                            Kean#4144's gear planner
                        </a>
                        .
                    </div>
                    <div className="text-lg">
                        I did not add any weapon since they are all
                        basically the same. Non-elemental weapons give 75%
                        floor potency, while elemental weapons give 70%.
                    </div>
                    <div className="text-lg">
                        Instead of using a database, data used for
                        calculation is store in memory, which means it will
                        use more RAM than usual but I doubt it will be
                        significant enough to cause a problem.
                    </div>
                    <div className="text-lg">
                        If you want to report a bug or suggest a feature,
                        you can hit me up on Discord 👉"Eurydia#4589".
                    </div>
                </div>
                <div>
                    <div className="text-xl font-bold">Credit</div>
                    <div className="text-lg">
                        Information about weapons, units and augments are
                        from the{" "}
                        <a href="https://pso2na.arks-visiphone.com/wiki/Portal:New_Genesis">
                            Arks-visiphone global website
                        </a>
                        .
                    </div>
                </div>

                {/* <ul className="text-lg list-disc list-inside gap-4">
                    <li>
                        
                    </li>
                </ul> */}
            </div>
        );
    }
}

export default About;
