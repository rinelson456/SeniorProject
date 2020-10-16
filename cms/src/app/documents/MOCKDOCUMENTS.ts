import {Document} from './document.model';

export const MOCKDOCUMENTS: any[] = [
  {
    dId: '1',
    dName: 'CIT 425 - Data Warehousing',
    url: 'https://rkjdatawarehousing.wordpress.com/',
    children: [
      {
        dId: '2',
        dName: 'Project 1 – The Kimball Method',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-1-the-kimball-method/'
      },
      {
        dId: '3',
        dName: 'Project 2 – Data warehouses vs. marts',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-2-data-warehouses-vs-marts/'
      },
      {
        dId: '4',
        dName: 'Project 3 – The ETL Process',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-3-the-etl-process/'
      },
      {
        dId: '5',
        dName: 'Project 4 – Modify the OLTP design',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-4-oltp-modifications-to-erp-design/'
      },
      {
        dId: '6',
        dName: 'Project 5 – The OLAP design',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-4/'
      },
      {
        dId: '7',
        dName: 'Project 6 – Transforming data',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/transforming-data/'
      },
      {
        dId: '8',
        dName: 'Project 7 – MarkLogic',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-7-marklogic/'
      },
      {
        dId: '9',
        dName: 'Project 8 – Build a web application',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-8/'
      }
    ]
  },
  {
    dId: '10',
    dName: 'CIT 460 - Enterprise Development',
    url: 'https://rkjackson.wordpress.com/',
    children: [
      {dId: '12', dName: 'Case 1 – Defining the requirements', url: 'https://rkjackson.wordpress.com/cases/case-1/'},
      {dId: '13', dName: 'Case 2 – User Interface design', url: 'https://rkjackson.wordpress.com/cases/case-2/'},
      {
        dId: '14', dName: 'Case 3 – Implementing Model Layer', url: 'https://rkjackson.wordpress.com/cases/case-3/',
        children: [
          {'dId': '36', dName: 'Team Assignment', dDescription: 'Create your first JavaBean class'}
          , {'dId': '37', dName: 'IndivdIdual Assignment', dDescription: 'Create remaining JavaBean classes'}
        ]
      },
      {dId: '15', dName: 'Case 4 – Enterprise Java Session Beans', url: 'https://rkjackson.wordpress.com/cases/case-4/'},
      {dId: '16', dName: 'Case 5 – Implementing the View', url: 'https://rkjackson.wordpress.com/cases/case-5/'},
      {dId: '17', dName: 'Case 6 – A Framework for the View Layer', url: 'https://rkjackson.wordpress.com/cases/case-6/'}
    ]
  },
  {
    dId: '20',
    dName: 'CIT 366 - Full Web Stack Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course dDescription.pdf',
    children: [
      {
        'dId': '21',
        'dName': 'Lesson 1 - JavaScript Best Practices',
        'url': 'https://content.byui.edu/file/f0594919-9524-47eb-9f4d-5c7239c3c002/1/Lesson1Introduction.pdf'
      },
      {
        'dId': '22',
        'dName': 'Lesson 2 - The DOM and JQuery',
        'url': 'https://content.byui.edu/file/c67e59fd-990c-4adc-9232-8027f847c8b9/1/Lesson2Introduction.pdf'
      },
      {
        'dId': '23',
        'dName': 'Lesson 3 - Angular 2 Framework 1',
        'url': 'https://content.byui.edu/file/aa9b6af5-b882-48f5-8321-caca980e5ec9/1/Lesson3Introduction.pdf'
      },
      {
        'dId': '24',
        'dName': 'Lesson 4 - Angular 2 Framework 2',
        'url': 'https://content.byui.edu/file/2c4ddd6c-dce4-408d-b581-f254a13e4d10/1/Lesson4Introduction.pdf'
      },
      {
        'dId': '25',
        'dName': 'Lesson 5 - Angular 2 Framework 3',
        'url': 'https://content.byui.edu/file/66dc0765-22a7-4cd8-a184-942c607636fb/1/Lesson5Introduction.pdf'
      }
    ]
  },
  {
    dId: '40',
    dName: 'CIT 366 - Full Web Stack Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course dDescription.pdf',
  },
  {
    dId: '41',
    dName: 'CIT 240 - Introduction to Networking',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course dDescription.pdf',
  },
  {
    dId: '42',
    dName: 'CIT 370 - Computer Security I',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course dDescription.pdf',
  },
  {
    dId: '43',
    dName: 'CIT 360 - Object Oriented Programming II',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course dDescription.pdf',
  },
  {
    dId: '44',
    dName: 'CIT 470 - Computer Security II',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course dDescription.pdf',
  },
  {
    dId: '45',
    dName: 'CIT 262 - Mobile Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course dDescription.pdf',
  },
  {
    dId: '46',
    dName: 'CIT 230 - Web Page Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course dDescription.pdf',
  },
  {
    dId: '47',
    dName: 'CIT 236 - Web Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course dDescription.pdf',
  },
  {
    dId: '48',
    dName: 'CIT 340 - Networking II',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course dDescription.pdf',
  },
];
