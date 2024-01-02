import supabase from "../database";

export default async function createProjectBullet(formData: FormData) {

    const projctId = formData.get("projectId") as string;
    const actionVerb = formData.get("actionVerb") as string;
    const feature = formData.get("feature") as string;
    const benefit = formData.get("benefit") as string;
    const challenge = formData.get("challenge") as string;
    const solution = formData.get("solution") as string;
    const result = formData.get("result") as string;
    const lessonLearned = formData.get("learned") as string;
    const nextSteps = formData.get("next") as string;


    const newBullet = {
        projctId,
        actionVerb,
        feature,
        benefit,
        challenge,
        solution,
        result,
        lessonLearned,
        nextSteps,
    }

    const { data, error } = await supabase
        .from("project_bullets")
        .insert(newBullet)
        .select();

    if (error) {
        console.log(error);
        return [];
    }
    if (data) {
        return data[0] ?? null;
    }
}