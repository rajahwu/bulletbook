import { redirect } from "react-router-dom";
import supabase from "../database";

export default async function createProjectBullet(formData: FormData) {

    const data = Object.fromEntries(formData.entries());

    const {
        project_id,
        action_verb,
        content,
        feature,
        benefit,
        challenge,
        solution,
        result,
        learned,
        next
    } = data;

    const newBullet = {
        project_id,
        action_verb,
        content,
        feature,
        benefit,
        challenge,
        solution,
        result,
        learned,
        next
    }

    const techKeys = Array.from(formData.keys()).filter(key => key.startsWith('tech-'));
    const techValues = techKeys.map(key => formData.get(key));

    const { data: insertBulletData, error: insertBulletError } = await supabase
        .from("project_bullets")
        .insert(newBullet)
        .select();

    if (insertBulletError) {
        console.log(insertBulletError);
        return [];
    }

    if (insertBulletData) {
        const bulletId = insertBulletData[0]?.id;
        const techData = techValues.map(techId => ({ tech_id: techId, bullet_id: bulletId }));

        techData.forEach(async (tech) => {
            const { data: insertTechData, error: insertTechError } = await supabase
                .from("bullet_techs")
                .insert(tech)
                .select();
            if (insertTechError) {
                console.log(insertTechError);
                return [];
            }
            if (insertTechData) {
                console.log(insertTechData);
            }
        });

        return redirect("/projects/" + newBullet.project_id);
        // return insertBulletData[0] ?? null;
    }
}
