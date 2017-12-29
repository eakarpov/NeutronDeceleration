import React from 'react';
import BackButton from "../../../components/BackButton/BackButton";

class AdminInstruction extends React.Component {

  render() {
    return (
      <div>
        <BackButton/>
        <h1>Руководство администратора</h1>
        <h3>Вход в систему</h3>
        <p>Для первого входа в систему, как администратор введите в форму регистрации дефолтные значения логина
        - <i>root</i> и пароля - <i>toor</i>. После этого вас перекинет на панель администратора. После этого обязательно установите свои значения логина и пароля.
          Для смены значений логина и пароля установленных по умолчанию перейдите в верхнем меню в раздел "Администратору" и выберите
        пункт "Поменять данны авторизации". Вас перебросит на форму изменения данных, в которой вы можете ввести новые значения для логина и пароля.</p>
        <h3>Панель администратора</h3>
        <p>На панели администратора находятся 4 раздела: </p>
        <ul>
          <li>"Группы"</li>
          <li>"Пользователи"</li>
          <li>"Тесты"</li>
          <li>"Статистика"</li>
        </ul>
        <h4>Раздел "Группы"</h4>
        <p>В данном разделе вы можете просмотреть список добавленных в систему групп в списка.
          Каждую группу можно удалить, нажав соответствующую ссылку.
          Также можно добавлять новые группы с помощью формы.</p>
        <h4>Раздел "Пользователи"</h4>
        <p>В данном разделе можно просмотреть всех студентов, имеющих доступ к системе. Они выводятся в виде таблицы.
          Для каждого студента указываются его логин и пароль для входа в систему, которые автоматически генерирует система,
          а также его имя, фамилия и группа. Каждого студента в таблице можно удалить нажатием кнопки с красным крестиком.
        Для таблицы с помощью выпадающего меню можно выбрать группу, студентами которой надо ограничить таблицу.
        По умолчанию это значение для таблицы указано как "Все группы". Новые студенты добавляются с помощью соответствующей формы.
          В ней заполняются имя и фамилия студента, а также из списка выбирается его группа. Сохранение данных осуществляется нажатием кнопки "+".
          Также присутствует кнопка "Экспортировать данные авторизации студентов". По нажатию на неё произойдёт загрузка файла
          формата csv с логинами и паролями студентов. Данные будут выгружаться в зависимости от того какие группы выбраны в выпадающем списке.
        </p>
        <h4>Раздел "Тесты"</h4>
        <p>В данном разделе представлена таблица со списком вопросов для теста. Каждый вопрос можно отредактировать и удалить, нажав на соотвествующую кнопку.
        С помощью кнопки "Добавить вопрос" происходит создание новых вопросов. При её нажатии вас перекинет на форму добавления новых вопросов.</p>
        <h5>Добавление вопросов</h5>
        <p>В данной форме представлено 5 полей ввода. Первое для самого вопроса и 4 для ответов на него. Рядом с каждым полем ввода для ответа
        присутствует квадратик, нажатием на который вы отмечаете правильные ответы. Снизу присутствует специальный ползунок, с помощью которого
        вы выбираете сложность вопроса по шкале от 5 до 10. Нажатием по кнопке "Добавить вопрос" вы сохраняете введённый вами вопрос. Внимание,
          вы должны заполнить все 5 полей ввода и выбрать хотя бы один правильный ответ, иначе система выдаст вам ошибку при нажатии на кнопку "Добавить вопрос".</p>
        <h4>Раздел "Статистика"</h4>
        <p>В данном разделе представлена таблица с результатами прохождения теста студентами. В таблице указаны имя, фамилия и группа студента,
        а также время, в которое студент завершил проходить тест, и полученное им количество баллов. По умолчанию выводятся данные по всем студентам.
        В выпадающем меню над таблицей можно указать конкретную группу, для которой необходимо получить статистику прохождения теста. Для добавления
        новый статистики по студентам необходимо нажать кнопку "Импортировать результаты". При её нажатии откроется меню, в котором необходимо выбрать специальный файл,
        который экспортирует студент после прохождения теста. Если файл не изменялся студентом, то добавление пройдёт успешно, о чём известит соответствующая надпись.
        Иначе будет ошибка импорта.</p>
        <h3>Выход</h3>
        <p>Для выхода из системы нажмите в верхнем меню вкладку "Выход". В ней вы можете выбрать два варианта: вернуться к форме
        авторизации - пункт "Выйти из аккаунта", или же закрыть программу - пункт "Выход из программы".</p>
      </div>
    );
  }

}

export default AdminInstruction;
