import { Button } from "./button";

export function stvoriModal() {
  return `
        <div class="modal-wrapper">
            <div class="modal">
                <form id="modal">
                    <div class="input-wrapper">
                        <label for="title">Upišite novi naslov</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                        >
                    </div>
                    ${Button("Promjeni naslov", "", { type: "submit" })}
                    ${Button("Exit", "", { id: "exit", type: "button" })}
                </form>
                
            </div>
        </div>
    `;
}
