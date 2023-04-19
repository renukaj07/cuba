import { IonContent, IonPage } from "@ionic/react";
import { FC, useEffect, useState } from "react";
import ChimpleLogo from "../components/ChimpleLogo";
import "./DisplayStudents.css";
import Loading from "../components/Loading";
import User from "../models/user";
import { AVATARS, MAX_STUDENTS_ALLOWED, PAGES } from "../common/constants";
import { IoAddCircleOutline } from "react-icons/io5";
import { useHistory } from "react-router";
import { ServiceConfig } from "../services/ServiceConfig";
import { t } from "i18next";

const DisplayStudents: FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [students, setStudents] = useState<User[]>();
  const history = useHistory();
  useEffect(() => {
    getStudents();
  }, []);
  const getStudents = async () => {
    const students =
      await ServiceConfig.getI().apiHandler.getParentStudentProfiles();
    console.log(
      "🚀 ~ file: DisplayStudents.tsx:13 ~ getStudents ~ students:",
      students
    );
    setStudents(students);
    setIsLoading(false);
  };
  const onStudentClick = (student: User) => {
    console.log(
      "🚀 ~ file: DisplayStudents.tsx:30 ~ onStudentClick:student",
      student
    );
    ServiceConfig.getI().apiHandler.currentStudent = student;
    history.push(PAGES.HOME);
  };
  const onCreateNewStudent = () => {
    history.push(PAGES.CREATE_STUDENT);
  };

  return (
    <IonPage id="display-students">
      <IonContent>
        <ChimpleLogo
          header={t("Welcome to Chimple!")}
          msg={t(
            "Discovering the joy of learning with Chimple - where curiosity meets education!"
          )}
        />
        {!isLoading && students && (
          <div className="content">
            <div className="avatar-container">
              {students.map((student) => (
                <div
                  key={student.docId}
                  onClick={() => onStudentClick(student)}
                  className="avatar"
                >
                  <img
                    className="avatar-img"
                    src={
                      "assets/avatars/" +
                      (student.avatar ?? AVATARS[0]) +
                      ".png"
                    }
                    alt=""
                  />
                  {student.name}
                </div>
              ))}
            </div>
            {students.length < MAX_STUDENTS_ALLOWED && (
              <div onClick={onCreateNewStudent} className="add-new-button">
                <IoAddCircleOutline size="18vh" />
                {t("Create New User")}
              </div>
            )}
          </div>
        )}
        <Loading isLoading={isLoading} />
      </IonContent>
    </IonPage>
  );
};
export default DisplayStudents;
