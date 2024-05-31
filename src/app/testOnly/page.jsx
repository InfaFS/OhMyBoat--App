import ViewComponent from "@/components/admin-components/viewEmployeesComponent2"
import { auth } from "../../../auth"
import { getUserById } from "../../../data/user"
import { getAllEmployees } from "../../../actions/getEmployees";
import { LoadingComponent } from "@/components/LoadingComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
export default async function testOnly() {
  return (
    <div>
      <h1>Test Only</h1>
      <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <>
            <div key={tag} className="text-sm">
              {tag}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
    </div>
  )
}


