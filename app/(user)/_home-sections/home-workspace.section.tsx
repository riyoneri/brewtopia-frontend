import WorkspaceCardList from "@/components/worskpaces/workspace-card-list";

export default function HomeWorkspaceSection() {
  return (
    <section className="bg-tertiary py-10">
      <div className="maximum-width space-y-5">
        <h1 className="main-heading text-pretty">8 Comfy Workspace</h1>
        <p className="text-balance sm:w-1/2">
          We provide many attractive and unique workplaces so you will have no
          trouble finding the workspace you want
        </p>
        <WorkspaceCardList />
      </div>
    </section>
  );
}
